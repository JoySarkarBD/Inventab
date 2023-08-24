/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import { useAuth } from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import {
  removeDuplicateObjects,
  removeUndefinedObj,
} from "../../utils/utilityFunc/utilityFunc";
import InputText from "../Form/InputText";
import TextArea from "../Form/TextArea";
import "./SalesDataForm.css";

export default function SalesDataForm(props) {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;

  // modal toggle func
  const { setToggleForm } = props.modalState;

  const [loading, setLoading] = useState(false);
  const [dept, setDept] = useState([]);
  const [client, setClient] = useState([]);
  const [subOrg, setsubOrg] = useState([]);
  const [allParts, setParts] = useState([]);
  const [partFullObj, setPartFullObj] = useState([]);
  const [partsLoading, setPartsLoading] = useState(false);
  const [selectPart, setSelectPart] = useState("");

  // table lowerpart data
  const [short_description, setshort_description] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [status, setstatus] = useState("");
  const [gst, setgst] = useState(0);
  const [net_price, setNet_price] = useState(0);
  const [extd_gross_price, setExtd_gross_price] = useState(0);

  // extract data from props
  const {
    lead_no,
    org,
    department,
    total,
    sub_org,
    probability,
    status: st,
    client: cl,
    expected_date,
    expected_invoice_date,
    mobile,
    description,
    contact_name,
    parts,
  } = props.salesData;

  // load dept, sub org, client, status all
  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    // organization || department
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `organizations/fetch/department/?org=${orgId}&role_id=4d5e5124-f4fd-4c91-981a-cc0074fb1356`,
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        const deptArr = [];
        isMount &&
          data?.results?.forEach((dept) => {
            const deptObj = {
              label: dept?.name,
              value: dept?.id,
            };
            deptArr.push(deptObj);
          });
        const removeUndefinedData = removeUndefinedObj(deptArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setDept(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();

    // client
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(`organizations/fetch/org/`, {
          signal: controller.signal,
        });
        setLoading(false);
        const clientArr = [];
        isMount &&
          data?.results?.forEach((client) => {
            const clientObj = {
              label: client?.company_name,
              value: client?.id,
            };
            clientArr.push(clientObj);
          });

        const removeUndefinedData = removeUndefinedObj(clientArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setClient(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    })();

    // sub org
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://inventab.io/api/v1/organizations/get/suborg/?org=${orgId}` /*  0a055b26-ae15-40a9-8291-25427b94ebb3 ==> prev org id*/,
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        const subOrgArr = [];
        isMount &&
          data?.results?.forEach((sub) => {
            const subObj = {
              label: sub?.sub_company_name,
              value: sub?.id,
            };
            subOrgArr.push(subObj);
          });

        const removeUndefinedData = removeUndefinedObj(subOrgArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);

        setsubOrg(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    })();

    // parts
    (async function () {
      try {
        setPartsLoading(true);
        const { data } = await axios.get("parts/parts", {
          signal: controller.signal,
        });
        setPartsLoading(false);
        setPartFullObj(data?.results);
        const partArr = [];
        isMount &&
          data?.results?.forEach((data) => {
            const partObj = {
              label: data?.part_number,
              value: data?.id,
            };
            partArr.push(partObj);
          });
        const removeUndefinedData = removeUndefinedObj(partArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setParts(uniqueArr);
      } catch (error) {
        setPartsLoading(false);
        console.log(error.message);
      }
    })();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [orgId, axios]);

  // ==============================table stuff start==============

  const handleTable = (event) => {
    event.preventDefault();

    const newPart = {
      part_id: {
        id: selectPart?.value,
        part_number: selectPart.label,
      },
      short_description,
      quantity: totalQuantity,
      unit_cost: unitCost,
      status: status?.value,
      gst,
      net_price,
      extd_gross_price,
    };

    setFieldValue("parts", [...values.parts, newPart]);
    // clear input field
    setSelectPart(null);
    setshort_description("");
    setTotalQuantity(0);
    setUnitCost(0);
    setstatus(null);
    setgst(0);
    setNet_price(0);
    setExtd_gross_price(0);
  };

  // remove row
  const handleRemovePart = (index) => {
    const updatedParts = [...values.parts];
    updatedParts.splice(index, 1); // Remove the object at the specified index
    setFieldValue("parts", updatedParts);
  };

  // ==============================table stuff end==============

  // handle update form
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      lead_no,
      org: org?.id,
      department: {
        label: department?.name || "",
        value: department?.id || "",
      },
      sub_org: {
        label: sub_org?.sub_company_name || "",
        value: sub_org?.id || "",
      },
      probability,
      status: {
        label: st || "",
        value: st || "",
      },
      client: {
        label: cl?.company_name || "",
        value: cl?.id || "",
      },
      expected_date: expected_date,
      expected_invoice_date,
      contact_name,
      mobile,
      description,
      total,
      parts,
    },

    onSubmit: async (values) => {
      try {
        const { department, status, client, parts: partArr, sub_org } = values;
        // sort part obj data
        let parts = [];
        partArr.forEach((p) => {
          const partObj = {
            lead_part_id: p?.lead_part_id,
            part_id: p?.part_id?.id,
            short_description: p?.short_description,
            quantity: parseFloat(p?.quantity),
            unit_cost: parseFloat(p?.unit_cost),
            status: p?.status,
            gst: parseFloat(p?.gst),
            net_price: parseFloat(p?.net_price),
            extd_gross_price: parseFloat(p?.extd_gross_price),
          };

          if (p?.lead_part_id == undefined) {
            delete partObj.lead_part_id;
          }

          parts?.push(partObj);
        });

        const updateObj = {
          ...values,
          department: department?.value || null,
          status: status?.value || null,
          client: client?.value || null,
          parts,
          sub_org: sub_org?.value || null,
        };

        // submit lead data
        const response = await axios.put(
          `pipo/update/sales/lead/${lead_no}/`,
          JSON.stringify(updateObj)
        );

        if (response?.status === 200) {
          toast.success("Lead updated successfully, Please update history");
          setTimeout(() => {
            setToggleForm(true);
          }, 2000);
        }
      } catch (error) {
        toast.error(error?.message, { duration: 2000 });
        console.log(error);
      }
    },
  });

  // status options
  const statusOptions = [
    { label: "Prospect", value: "Prospect" },
    { label: "Approach", value: "Approach" },
    { label: "Qualify", value: "Qualify" },
    { label: "Pitch", value: "Pitch" },
    { label: "Handle Objections", value: "Handle Objections" },
    { label: "Close the Deal", value: "Close the Deal" },
    { label: "Lost Deal", value: "Lost Deal" },
  ];

  // parts status
  const partsStatus = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  //update && change select options
  const handlePartSelectChange = (selectedOption, index) => {
    const { value, label } = selectedOption;
    const updatedParts = [...values.parts];

    if (value) {
      updatedParts[index].part_id.id = value;
      updatedParts[index].part_id.part_number = label;
      let s = partFullObj.find((part) => part?.id === value);
      updatedParts[index].short_description = s?.short_description || "";
    }

    setFieldValue("parts", updatedParts);
  };

  // update && change parts status options
  const handlePartStatusChange = (selectedOption, index) => {
    const updatedParts = [...values.parts];
    updatedParts[index].status = selectedOption?.value;
    setFieldValue("parts", updatedParts);
  };

  // select part for the [PART NO]
  const handleSelectPart = (option) => {
    let { value } = option;
    if (value) {
      let s = partFullObj.find((part) => part?.id === value);
      setSelectPart(option);
      setshort_description(s?.short_description || "");
    } else {
      setshort_description("");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className='row'>
          {/* add department input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Department</label>
            <Select
              title='Department'
              placeholder='Select Department'
              isClearable
              isSearchable
              name='department'
              options={dept}
              isLoading={loading}
              value={values.department}
              // defaultValue={deptDefaultSelect}
              onChange={(option) => setFieldValue("department", option)}
            />
          </div>

          {/* add sub org input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sub org</label>
            <Select
              placeholder='Select Sub Org'
              name='sub_org'
              isClearable
              isSearchable
              options={subOrg}
              isLoading={loading}
              value={values?.sub_org}
              onChange={(option) => setFieldValue("sub_org", option)}
            />
          </div>

          {/* add probability input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Probability
            </label>
            <InputText
              type='number'
              name='probability'
              value={values?.probability}
              onChange={handleChange}
            />
          </div>

          {/* total */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Total</label>
            <InputText
              type='number'
              name='total'
              value={values?.total}
              onChange={handleChange}
            />
          </div>

          {/* add status input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Status*</label>
            <Select
              placeholder='Select Status'
              isClearable
              isSearchable
              name='status'
              options={statusOptions}
              isLoading={loading}
              value={values?.status}
              onChange={(option) => setFieldValue("status", option)}
            />
          </div>

          {/* add client input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Client*</label>
            <Select
              placeholder='Select Client'
              isSearchable
              isClearable
              name='client'
              options={client}
              value={values?.client}
              onChange={(option) => setFieldValue("client", option)}
            />
          </div>

          {/* add po date input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Expected PO Date*'
              type='date'
              name='expected_date'
              value={values.expected_date}
              onChange={handleChange}
            />
          </div>

          {/* add invoice date input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Expected Invoice Date*'
              type='date'
              name='expected_invoice_date'
              value={values.expected_invoice_date}
              onChange={handleChange}
            />
          </div>

          {/* add contact name input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Contact Name
            </label>
            <InputText
              name='contact_name'
              type='text'
              value={values.contact_name}
              onChange={handleChange}
            />
          </div>

          {/* add mobile number input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Mobile Number*'
              type='text'
              name='mobile'
              value={values.mobile}
              onChange={handleChange}
            />
          </div>

          {/* add description input */}
          <div className='mb-3 col-12'>
            <TextArea
              title='Description*'
              className='w-100'
              placeholder='Description'
              name='description'
              value={values?.description}
              onChange={handleChange}
            />
            <br />
          </div>
        </div>
        {/* Table Part */}

        {/* Table */}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='table-responsive111'>
              <table className='table header-border table-bordered table-responsive-sm111'>
                <thead>
                  <tr>
                    <th scope='col'>Part No</th>
                    <th scope='col'>Short Description</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Unit Cost</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>GST</th>
                    <th scope='col'>Net Price</th>
                    <th scope='col'>Extd Gross Price</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className='select-port'>
                        <Select
                          className='select select-width'
                          placeholder='Select Part No'
                          isSearchable
                          isClearable
                          menuPortalTarget={document.querySelector("body")}
                          isLoading={partsLoading}
                          options={allParts}
                          onChange={(option) => handleSelectPart(option)}
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        className='new_input_class dsc-width'
                        type='text'
                        placeholder='Short Description'
                        name='short_description'
                        value={short_description || ""}
                        onChange={(e) => setshort_description(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className='new_input_class input-width'
                        type='number'
                        placeholder='Total Quantity'
                        name='quantity'
                        value={totalQuantity || ""}
                        onChange={(e) => setTotalQuantity(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className='new_input_class input-width'
                        type='number'
                        placeholder='Unit Cost'
                        name='unit_cost'
                        value={unitCost || ""}
                        onChange={(e) => setUnitCost(e.target.value)}
                      />
                    </td>
                    <td>
                      <Select
                        className='select select-width'
                        placeholder='Select Status'
                        isSearchable
                        isClearable
                        menuPortalTarget={document.querySelector("body")}
                        options={partsStatus}
                        onChange={setstatus}
                      />
                    </td>
                    <td>
                      <input
                        className='new_input_class input-width'
                        type='number'
                        placeholder='GST'
                        name='gst'
                        value={gst || ""}
                        onChange={(e) => setgst(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className='new_input_class input-width'
                        type='number'
                        placeholder='Net Price'
                        name='net_price'
                        value={net_price || ""}
                        onChange={(e) => setNet_price(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className='new_input_class input-width'
                        type='number'
                        placeholder='Extd Gross Price'
                        name='extd_gross_price'
                        value={extd_gross_price || ""}
                        onChange={(e) => setExtd_gross_price(e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        className='btn btn-primary rounded-1 py-2 px-4 d-flex justify-content-center align-items-center'
                        disabled={
                          !(
                            short_description ||
                            totalQuantity ||
                            unitCost ||
                            status ||
                            gst ||
                            net_price ||
                            extd_gross_price
                          )
                        }
                        onClick={handleTable}>
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  */}

        {/*========================= dynamic table=============== */}

        {partsLoading ? (
          <Loader />
        ) : (
          <>
            {values.parts?.length ? (
              <div className='table-responsive111'>
                <table className='table table-bordered table-responsive-sm111'>
                  <thead>
                    <tr>
                      <th scope='col'>Part No</th>
                      <th scope='col'>Short Description</th>
                      <th scope='col'>Unit Cost</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>GST</th>
                      <th scope='col'>Net Price</th>
                      <th scope='col'>Extd Gross Price</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values?.parts?.map((part, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>
                            <div className='select-port'>
                              <Select
                                className='select select-width'
                                placeholder='Select Port No'
                                value={{
                                  label: part?.part_id?.part_number || "",
                                  value: part?.part_id?.id || "",
                                }}
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                                options={allParts}
                                name='part_id'
                                isSearchable
                                isClearable
                                isLoading={partsLoading}
                                onChange={(selectedOption) =>
                                  handlePartSelectChange(selectedOption, index)
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              className='new_input_class dsc-width'
                              type='text'
                              placeholder='Short Description'
                              name={`parts[${index}].short_description`}
                              value={part.short_description}
                              onChange={handleChange}
                            />
                          </td>

                          <td>
                            <input
                              className='new_input_class input-width'
                              type='number'
                              placeholder='Unit Cost'
                              name={`parts[${index}].unit_cost`}
                              value={part?.unit_cost}
                              onChange={handleChange}
                            />
                          </td>

                          <td>
                            <input
                              className='new_input_class input-width'
                              type='number'
                              placeholder='Total Quntity'
                              name={`parts[${index}].quantity`}
                              value={part.quantity}
                              onChange={handleChange}
                            />
                          </td>

                          <td>
                            <Select
                              className='select select-width'
                              placeholder='Status'
                              isSearchable
                              isClearable
                              name={`parts[${index}].status`}
                              menuPortalTarget={document.querySelector("body")}
                              value={{
                                label: part?.status,
                                value: part?.status,
                              }}
                              options={partsStatus}
                              onChange={(selectedOption) =>
                                handlePartStatusChange(selectedOption, index)
                              }
                            />
                          </td>

                          <td>
                            <input
                              className='new_input_class input-width'
                              type='number'
                              placeholder='Extd Net Cost'
                              name={`parts[${index}].gst`}
                              value={part?.gst}
                              onChange={handleChange}
                            />
                          </td>

                          <td>
                            <input
                              className='new_input_class input-width'
                              type='number'
                              placeholder='Extd Net Cost'
                              name={`parts[${index}].net_price`}
                              value={part?.net_price}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class input-width'
                              type='number'
                              placeholder='Extd Gross Cost'
                              name={`parts[${index}].extd_gross_price`}
                              value={part?.extd_gross_price}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <button
                              className='btn btn-danger btn-sm'
                              onClick={() => handleRemovePart(index)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <h4 className='text-center'>Parts Not Available</h4>
            )}
          </>
        )}

        {/* Submit Button */}
        <div className='d-flex justify-content-end my-4'>
          <input
            className='btn btn-primary btn-common rounded-1'
            type='submit'
            value='Update Sales Lead'
          />
        </div>
      </form>
    </>
  );
}
