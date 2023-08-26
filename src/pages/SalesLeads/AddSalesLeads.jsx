import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../components/Shared/PageTitle";
import { useAuth } from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import {
  removeDuplicateObjects,
  removeUndefinedObj,
} from "../../utils/utilityFunc/utilityFunc";
import InputText from "./../../components/Form/InputText";
import TextArea from "./../../components/Form/TextArea";

const AddSalesDataForm = () => {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;

  const [loading, setLoading] = useState(false);
  const [dept, setDept] = useState([]);
  const [client, setClient] = useState([]);
  const [subOrg, setsubOrg] = useState([]);
  const [parts, setParts] = useState([]);
  const [partFullObj, setPartFullObj] = useState([]);
  const [selectPart, setSelectPart] = useState(null);
  const [partsLoading, setPartsLoading] = useState(false);

  // table lowerpart data
  const [short_description, setshort_description] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [status, setstatus] = useState("");
  const [gst, setgst] = useState();
  const [net_price, setNet_price] = useState(0);
  const [extd_gross_price, setExtd_gross_price] = useState(0);

  // set net price
  useEffect(() => {
    if (totalQuantity && totalQuantity > 0 && unitCost && unitCost > 0) {
      setNet_price(parseInt(totalQuantity * unitCost));
    } else {
      setNet_price(0);
    }
  }, [totalQuantity, unitCost]);

  // set extd gross price
  useEffect(() => {
    if (net_price && net_price > 0 && gst && gst > 0) {
      let modifiedGst = parseInt(gst) + 1;
      let gross_price = modifiedGst * parseInt(net_price);
      setExtd_gross_price(gross_price);
    } else {
      setExtd_gross_price(0);
    }
  }, [gst, net_price]);

  // load department, Client, sub-organization
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
        console.log(error);
      }
    })();

    // sub org
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://inventab.io/api/v1/organizations/get/suborg/?org=${orgId}`,
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        const subOrgArr = [];
        isMount &&
          data?.results?.forEach((sub) => {
            const clientObj = {
              label: sub?.sub_company_name,
              value: sub?.id,
            };
            subOrgArr.push(clientObj);
          });

        const removeUndefinedData = removeUndefinedObj(subOrgArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setsubOrg(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
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
        console.log(error);
      }
    })();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [axios, orgId]);

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

  // form submit
  const { setFieldValue, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      department: null,
      sub_org: null,
      probability: 0,
      total: 0,
      status: null,
      client: null,
      expected_date: "",
      expected_invoice_date: "",
      contact_name: "",
      mobile: "",
      description: "",
      parts: [],
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log(values);
        const { department, sub_org, client, status, parts: partArr } = values;
        // sort part obj data
        let parts = [];
        partArr.forEach((p) => {
          const partObj = {
            lead_part_id: p?.lead_part_id,
            part_id: p?.part_id?.id,
            short_description: p?.short_description,
            quantity: parseFloat(p?.quantity),
            unit_cost: parseFloat(p?.unit_cost),
            status: "Active",
            gst: parseFloat(p?.gst),
            net_price: parseFloat(p?.net_price),
            extd_gross_price: parseFloat(p?.extd_gross_price),
          };

          if (p?.lead_part_id == undefined) {
            delete partObj.lead_part_id;
          }

          parts?.push(partObj);
        });

        // created lead obj
        const createLeadObj = {
          ...values,
          org: orgId,
          department: department?.value || null,
          sub_org: sub_org?.value || null,
          status: status?.value || null,
          client: client?.value || null,
          parts,
        };
        // return console.log(createLeadObj);
        const res = await axios.post(
          `pipo/create/sales/lead/`,
          JSON.stringify(createLeadObj)
        );
        if (res?.status === 201) {
          resetForm({ values: "" });
          toast.success("Lead created successfully");
        }
      } catch (error) {
        toast.error(error?.message, { duration: 2000 });
        console.log(error);
      }
    },
  });

  //parts created staff
  const handleTable = () => {
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

  // select part
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
      <PageTitle title='Add Sales Leads' />
      {/* back button */}
      <div className='d-flex justify-content-end me-5 mb-4 '>
        <Link
          to='/dashboard/sales-leads'
          className='btn btn-primary rounded-1 border-0 text-white'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='card'>
        <div className='card-header flex'>
          <h4 className='card-title'>Add Sales Lead</h4>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              {/* Sales Lead input */}
              <div className='mb-3 col-md-6'>
                <label className='mb-2 text-dark text-capitalize'>
                  Department
                </label>
                <Select
                  title='Department'
                  placeholder='Select Department'
                  name='department'
                  isClearable
                  isSearchable
                  options={dept}
                  value={values.department}
                  onChange={(option) => setFieldValue("department", option)}
                />
              </div>

              {/* add sub org input */}
              <div className='mb-3 col-md-6'>
                <label className='mb-2 text-dark text-capitalize'>
                  Sub org
                </label>
                <Select
                  placeholder='Select Sub Org'
                  isLoading={loading}
                  name='sub_org'
                  isSearchable
                  options={subOrg}
                  value={values?.sub_org}
                  onChange={(option) => setFieldValue("sub_org", option)}
                />
              </div>

              {/* Rof PO NO input */}
              <div className='mb-3 col-md-6'>
                <InputText
                  title='Probability'
                  type='text'
                  name='probability'
                  placeholder='Probability'
                  value={values?.probability || ""}
                  onChange={handleChange}
                />
              </div>

              {/* total */}
              <div className='mb-3 col-md-6'>
                <label className='mb-2 text-dark text-capitalize'>Total</label>
                <InputText
                  type='number'
                  name='total'
                  placeholder='Total'
                  value={values?.total || ""}
                  onChange={handleChange}
                />
              </div>

              {/* add status input */}
              <div className='mb-3 col-md-6'>
                <label className='mb-2 text-dark text-capitalize'>
                  Status*
                </label>
                <Select
                  placeholder='Select Status'
                  isLoading={loading}
                  isClearable
                  isSearchable
                  name='status'
                  options={statusOptions}
                  onChange={(option) => setFieldValue("status", option)}
                />
              </div>

              {/* add client input */}
              <div className='mb-3 col-md-6'>
                <label className='mb-2 text-dark text-capitalize'>
                  Client*
                </label>
                <Select
                  placeholder='Select Client'
                  isLoading={loading}
                  isSearchable
                  isClearable
                  name='client'
                  options={client}
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
                  placeholder='Contact Name'
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
                  placeholder='Mobile Number'
                  value={values.mobile}
                  onChange={handleChange}
                />
              </div>

              {/* description input */}
              <div className='mb-3 col-12'>
                <TextArea
                  title='Description*'
                  className='w-100'
                  placeholder='Description'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                />
                <br />
              </div>
            </div>
            {/* Table Part */}
            {/* Table */}
            {/* Table */}
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='table-responsive111'>
                    <table className='table header-border table-responsive-sm111'>
                      <thead>
                        <tr>
                          <th scope='col'>Part No</th>
                          <th scope='col'>Short Description</th>
                          <th scope='col'>Quantity</th>
                          <th scope='col'>Unit Cost</th>
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
                                className='select'
                                placeholder='Select Part No'
                                isSearchable
                                isClearable
                                isLoading={partsLoading && parts?.length > 0}
                                options={parts}
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                                onChange={(option) => handleSelectPart(option)}
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='text'
                              // placeholder='Short Description'
                              name='short_description'
                              value={short_description || ""}
                              onChange={(e) =>
                                setshort_description(e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              // placeholder='Total Quantity'
                              name='quantity'
                              value={totalQuantity || ""}
                              onChange={(e) => setTotalQuantity(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              // placeholder='Unit Cost'
                              name='unit_cost'
                              value={unitCost || ""}
                              onChange={(e) => setUnitCost(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              // placeholder='GST'
                              name='gst'
                              value={gst || ""}
                              onChange={(e) => setgst(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              // placeholder='Net Price'
                              name='net_price'
                              defaultValue={net_price || ""}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              // placeholder='Extd Gross Price'
                              name='extd_gross_price'
                              defaultValue={extd_gross_price || ""}
                              readOnly
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
            </div>
            {/*  */}

            {/* dynamic table */}
            {partsLoading ? (
              <Loader />
            ) : (
              <>
                {" "}
                <div className='table-responsive111'>
                  {values.parts.length > 0 ? (
                    <table className='table table-bordered table-responsive-sm111'>
                      <thead>
                        <tr>
                          <th scope='col'>Part No</th>
                          <th scope='col'>Short Description</th>
                          <th scope='col'>Quantity</th>
                          <th scope='col'>Unit Cost</th>
                          {/* <th scope='col'>Status</th> */}
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
                                    className='select'
                                    placeholder='Select Port No'
                                    value={{
                                      label: part?.part_id?.part_number,
                                      value: part?.part_id?.id,
                                    }}
                                    options={parts}
                                    name='part_id'
                                    isSearchable
                                    isClearable
                                    onChange={(selectedOption) =>
                                      handlePartSelectChange(
                                        selectedOption,
                                        index
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <input
                                  className='new_input_class'
                                  type='text'
                                  placeholder='Short Description'
                                  name={`parts[${index}].short_description`}
                                  value={part.short_description}
                                  onChange={handleChange}
                                />
                              </td>

                              <td>
                                <input
                                  className='new_input_class'
                                  type='number'
                                  placeholder='Total Quntity'
                                  name={`parts[${index}].quantity`}
                                  value={part.quantity}
                                  onChange={handleChange}
                                />
                              </td>

                              <td>
                                <input
                                  className='new_input_class'
                                  type='number'
                                  placeholder='Unit Cost'
                                  name={`parts[${index}].unit_cost`}
                                  value={part?.unit_cost}
                                  onChange={handleChange}
                                />
                              </td>

                              <td>
                                <input
                                  className='new_input_class'
                                  type='number'
                                  placeholder='Extd Net Cost'
                                  name={`parts[${index}].gst`}
                                  value={part?.gst || ""}
                                  onChange={handleChange}
                                />
                              </td>

                              <td>
                                <input
                                  className='new_input_class'
                                  type='number'
                                  placeholder='Extd Net Cost'
                                  name={`parts[${index}].net_price`}
                                  value={part?.net_price}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <input
                                  className='new_input_class'
                                  type='number'
                                  placeholder='Extd Gross Cost'
                                  name={`parts[${index}].extd_gross_price`}
                                  value={part?.extd_gross_price}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <button
                                  type='button'
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
                  ) : (
                    <h3 className='text-center'>No Parts Added</h3>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className='d-flex justify-content-end my-4'>
              <input
                className='btn btn-primary btn-common rounded-1'
                type='submit'
                value='Add Sales Lead'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSalesDataForm;
