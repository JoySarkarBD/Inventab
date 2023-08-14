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

export default function DataForm() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId, userId } = auth;

  const [loading, setLoading] = useState(false);
  const [partsLoading, setPartsLoading] = useState(false);
  const [allParts, setParts] = useState([]);
  const [partFullObj, setPartFullObj] = useState([]);
  const [dept, setDept] = useState([]);
  const [client, setClient] = useState([]);
  const [subOrg, setSubOrg] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState([]);
  const [deliveryTerm, setDeliveryTerm] = useState([]);
  const [contactTo, setContactTo] = useState([]);
  const [transportationTerm, setTransportationTerm] = useState([]);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);

  // parts option
  const [selectPart, setSelectPart] = useState("");
  const [short_description, setshort_description] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [gst, setgst] = useState(0);
  const [net_price, setNet_price] = useState(0);
  const [extd_gross_price, setExtd_gross_price] = useState(0);

  // load sub_org, client,  org, parts, payment term, delivery term, contact to, transportation term, shipping && billing address

  useEffect(() => {
    // load sub_organization
    (async function () {
      try {
        setLoading(true);

        const {
          data: { results },
        } = await axios.get(`organizations/get/suborg/?org=${orgId}`);
        setLoading(false);

        const subOrgArr = [];
        results.forEach((res) => {
          const obj = {
            label: res?.sub_company_name,
            value: res?.id,
          };
          subOrgArr.push(obj);
        });

        setSubOrg(subOrgArr);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        toast.error(error.response.status);
      }
    })();

    // client
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(`organizations/fetch/org/`);
        setLoading(false);
        const clientArr = [];
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

    // organization || department
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `organizations/fetch/department/?org=${orgId}&role_id=4d5e5124-f4fd-4c91-981a-cc0074fb1356`
        );
        setLoading(false);
        const deptArr = [];
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

    // parts
    (async function () {
      try {
        setPartsLoading(true);
        const { data } = await axios.get("parts/parts");
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

    // payment term
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get("organizations/fetch/payment/term/");
        setLoading(false);

        const paymentArr = [];
        data?.results?.forEach((data) => {
          const paymentObj = {
            label: data?.term,
            value: data?.id,
          };
          paymentArr.push(paymentObj);
        });
        const removeUndefinedData = removeUndefinedObj(paymentArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setPaymentTerm(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();

    // delivery term
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get("organizations/fetch/delivery/term/");
        setLoading(false);

        const deliveryArr = [];
        data?.results?.forEach((data) => {
          const paymentObj = {
            label: data?.term,
            value: data?.id,
          };
          deliveryArr.push(paymentObj);
        });
        const removeUndefinedData = removeUndefinedObj(deliveryArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setDeliveryTerm(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();

    // contact_to
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "users/get/user/?org=Autopeepal%20Technologies%20Private%20Limited"
        );
        setLoading(false);

        const contactArr = [];
        data?.results?.forEach((data) => {
          const contactObj = {
            label: data?.email,
            value: data?.id,
          };
          contactArr.push(contactObj);
        });
        const removeUndefinedData = removeUndefinedObj(contactArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setContactTo(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();

    // transportation term
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(`pipo/transportation-terms/list/`);

        setLoading(false);
        const transportationArr = [];
        data?.results?.forEach((t) => {
          const transportationObj = {
            label: t?.name,
            value: t?.id,
          };
          transportationArr.push(transportationObj);
        });

        const removeUndefinedData = removeUndefinedObj(transportationArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        setTransportationTerm(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();

    // shipping && billing address
    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `organizations/fetch/org/address/?org=${orgId}`
        );

        setLoading(false);
        const shippingArr = [];
        data?.results?.forEach((s) => {
          const shippingArrObj = {
            value: s?.id,
            label: s?.address,
          };
          shippingArr.push(shippingArrObj);
        });

        const removeUndefinedData = removeUndefinedObj(shippingArr);
        const uniqueArr = removeDuplicateObjects(removeUndefinedData);
        // shipping
        setShippingAddress(uniqueArr);
        //billing
        setBillingAddress(uniqueArr);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [axios, orgId]);

  // handle sales order from
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      po_date: "",
      expected_inv_date: "",
      ref_po: "",
      comments: "",
      is_active: false,
      is_approved: false,
      total: 0,
      description: "",
      so_status: "",
      created_by: userId,
      org: orgId,
      client: "",
      sub_org: "",
      billing_address: "",
      shipping_address: "",
      payment_term: "",
      delivery_term: "",
      contact_to: "",
      department: "",
      transportation_term: "",
      parts: [],
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const {
          parts,
          client,
          department,
          contact_to,
          sub_org,
          so_status,
          delivery_term,
          payment_term,
          transportation_term,
          shipping_address,
          billing_address,
        } = values;

        // part arr d. s. like server
        const partArr = [];
        parts.forEach((part) => {
          const partObj = {
            quantity: parseFloat(part?.quantity),
            parts_no: part?.parts_id?.part_number,
            parts_id: part?.parts_id?.id,
            price: parseFloat(part?.price),
            gst: parseFloat(part?.gst),
            net_price: parseFloat(part?.net_price),
            extd_gross_price: parseFloat(part?.extd_gross_price),
            short_description: part?.short_description,
          };
          partArr.push(partObj);
        });

        // return console.log(partArr);

        const orderObj = {
          ...values,
          client: client?.value || null,
          sub_org: sub_org?.value || null,
          billing_address: billing_address?.value || null,
          shipping_address: shipping_address?.value || null,
          payment_term: payment_term?.value || null,
          delivery_term: delivery_term?.value || null,
          contact_to: contact_to?.value || null,
          department: department?.value,
          so_status: so_status?.value || null,
          transportation_term: transportation_term?.value || null,
          parts: partArr,
        };

        const res = await axios.post(
          `pipo/create/sales/order/`,
          JSON.stringify(orderObj)
        );
        if (res.status === 201) {
          resetForm({ values: "" });
          toast.success("Order updated successfully");
        } else {
          toast.error("Something wrong, please try again later", {
            duration: 2000,
          });
        }
      } catch (error) {
        toast.error(error?.message, { duration: 2000 });
        console.log(error);
      }
    },
  });

  // so status
  const soStatus = [
    { label: "Paid", value: "Paid" },
    { label: "UnPaid", value: "UnPaid" },
    { label: "Closed", value: "Closed" },
    { label: "Invoiced", value: "Invoiced" },
  ];

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

  //update && change select options
  const handlePartSelectChange = (selectedOption, index) => {
    const { value, label } = selectedOption;
    const updatedParts = [...values.parts];

    if (value) {
      updatedParts[index].parts_id = value;
      updatedParts[index].parts_no = label;
      let s = partFullObj.find((part) => part?.id === value);
      updatedParts[index].short_description = s?.short_description || "";
    }

    setFieldValue("parts", updatedParts);
  };

  // handle add part
  const handleAddPart = () => {
    const newPart = {
      short_description,
      parts_id: {
        part_number: selectPart?.label,
        id: selectPart?.value,
      },
      quantity: parseFloat(totalQuantity),
      price: parseFloat(price),
      gst: parseFloat(gst),
      net_price: parseFloat(net_price),
      extd_gross_price: parseFloat(extd_gross_price),
    };

    setFieldValue("parts", [...values.parts, newPart]);

    setSelectPart(null);
    setshort_description("");
    setTotalQuantity(0);
    setPrice(0);
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

  return (
    <div className='card-body'>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className='row'>
          {/* Po date input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='PO Date'
              type='date'
              name='po_date'
              value={values?.po_date}
              onChange={handleChange}
            />
          </div>

          {/* ex inv date input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Expected Invoice Date'
              type='date'
              name='expected_inv_date'
              value={values.expected_inv_date}
              onChange={handleChange}
            />
          </div>

          {/* Rof PO NO input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Ref PO'
              type='text'
              name='ref_po'
              value={values?.ref_po}
              onChange={handleChange}
            />
          </div>

          {/* comments input */}
          <div className='mb-3 col-md-6'>
            <TextArea
              title='Comments'
              type='text'
              name='comments'
              placeholder='Type Your Comments'
              value={values?.comments}
              onChange={handleChange}
            />
          </div>

          {/* total input*/}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Total'
              type='number'
              name='total'
              value={values?.total || ""}
              onChange={handleChange}
            />
          </div>

          {/* so status select*/}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>So Status</label>
            <Select
              placeholder='Select So Status'
              isLoading={loading}
              isSearchable
              isClearable
              name='so_status'
              value={values.so_status}
              options={soStatus}
              onChange={(option) => setFieldValue("so_status", option)}
            />
          </div>

          {/* Select client */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Client</label>
            <Select
              placeholder='Select Client'
              isLoading={loading}
              isSearchable
              isClearable
              name='client'
              value={values?.client}
              options={client}
              onChange={(option) => setFieldValue("client", option)}
            />
          </div>

          {/* Select sub org */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sub Org</label>
            <Select
              placeholder='Select Sub Org'
              isLoading={loading}
              isSearchable
              isClearable
              name='sub_org'
              value={values.sub_org}
              options={subOrg}
              onChange={(option) => setFieldValue("sub_org", option)}
            />
          </div>

          {/* select billing address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Billing Address
            </label>
            <Select
              placeholder='Select Billing Address'
              isLoading={loading}
              isSearchable
              isClearable
              name='billing_address'
              value={values.billing_address}
              options={billingAddress}
              onChange={(option) => setFieldValue("billing_address", option)}
            />
          </div>

          {/* select shipping address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Shipping Address
            </label>
            <Select
              placeholder='Select Shipping Address'
              isLoading={loading}
              isSearchable
              isClearable
              name='shipping_address'
              value={values.shipping_address}
              options={shippingAddress}
              onChange={(option) => setFieldValue("shipping_address", option)}
            />
          </div>

          {/* payment term select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Payment Term
            </label>
            <Select
              placeholder='Select Payment Term'
              isLoading={loading}
              isSearchable
              isClearable
              name='payment_term'
              value={values.payment_term}
              options={paymentTerm}
              onChange={(option) => setFieldValue("payment_term", option)}
            />
          </div>

          {/* delivery term select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Delivery Term
            </label>
            <Select
              placeholder='Select Delivery Term'
              isLoading={loading}
              isSearchable
              isClearable
              name='delivery_term'
              value={values.delivery_term}
              options={deliveryTerm}
              onChange={(option) => setFieldValue("delivery_term", option)}
            />
          </div>

          {/* contact to select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Contact To</label>
            <Select
              placeholder='Select Contact To'
              isLoading={loading}
              isSearchable
              isClearable
              name='contact_to'
              value={values.contact_to}
              options={contactTo}
              onChange={(option) => setFieldValue("contact_to", option)}
            />
          </div>

          {/* department select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Department</label>
            <Select
              placeholder='Select Department'
              isLoading={loading}
              isSearchable
              isClearable
              name='department'
              value={values.department}
              options={dept}
              onChange={(option) => setFieldValue("department", option)}
            />
          </div>

          {/* transportation term select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Transportation Term
            </label>
            <Select
              placeholder='Select Transportation Term'
              isLoading={loading}
              isSearchable
              isClearable
              name='transportation_term'
              value={values.transportation_term}
              options={transportationTerm}
              onChange={(option) =>
                setFieldValue("transportation_term", option)
              }
            />
          </div>

          {/* description input */}
          <div className='mb-3 col-md-12'>
            <TextArea
              title='Description'
              type='text'
              name='description'
              placeholder='Type Description'
              value={values.description}
              onChange={handleChange}
            />
          </div>

          {/* is active check */}
          <div className='mb-3 col-md-12'>
            <input
              type='checkbox'
              name='is_active'
              id='is_active'
              value={values.is_active}
              onChange={handleChange}
            />
            <label htmlFor='is_active' className='mx-2'>
              Active
            </label>
          </div>

          {/* is_approved check */}
          <div className='mb-3 col-md-12'>
            <input
              type='checkbox'
              name='is_approved'
              id='is_approved'
              value={values.is_approved}
              onChange={handleChange}
            />
            <label htmlFor='is_approved' className='mx-2'>
              Approved
            </label>
          </div>
        </div>
        {/* Table Part */}
        {/* Table */}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='table-responsive111'>
                <table className='table header-border table-responsive-sm111'>
                  <thead>
                    <tr>
                      <th scope='col'>Parts No</th>
                      <th scope='col'>Short Description</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Price</th>
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
                          className='new_input_class'
                          type='text'
                          placeholder='Short Description'
                          name='short_description'
                          value={short_description || ""}
                          onChange={(e) => setshort_description(e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Total Quantity'
                          name='quantity'
                          value={totalQuantity || ""}
                          onChange={(e) => setTotalQuantity(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Price'
                          name='price'
                          value={price || ""}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='GST'
                          name='gst'
                          value={gst || ""}
                          onChange={(e) => setgst(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Net Price'
                          name='net_price'
                          value={net_price || ""}
                          onChange={(e) => setNet_price(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Extd Gross Price'
                          name='extd_gross_price'
                          value={extd_gross_price || ""}
                          onChange={(e) => setExtd_gross_price(e.target.value)}
                        />
                      </td>

                      <td>
                        <button
                          onClick={handleAddPart}
                          type='button'
                          className='btn btn-primary rounded-1 py-2 px-4 d-flex justify-content-center align-items-center'
                          disabled={
                            !(
                              short_description ||
                              totalQuantity ||
                              price ||
                              gst ||
                              net_price ||
                              extd_gross_price
                            )
                          }>
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

        {/* dynamic table */}
        {/* dynamic table */}
        {partsLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className='table-responsive111'>
              {values?.parts?.length > 0 ? (
                <table className='table table-bordered table-responsive-sm111'>
                  <thead>
                    <tr>
                      <th scope='col'>Parts No</th>
                      <th scope='col'>Short Description</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>GST</th>
                      <th scope='col'>Net Price</th>
                      <th scope='col'>Extd Gross Price</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  {values?.parts?.map((part, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <div className='select-port'>
                              <Select
                                className='select select-width'
                                placeholder='Select Part No'
                                isSearchable
                                isClearable
                                value={{
                                  label: part?.parts_id?.part_number,
                                  value: part?.parts_id?.id,
                                }}
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                                options={allParts}
                                name='part_id'
                                isLoading={partsLoading}
                                onChange={(selectedOption) =>
                                  handlePartSelectChange(selectedOption, index)
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
                              placeholder='Total Quantity'
                              name={`parts[${index}].quantity`}
                              value={part.quantity}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Price'
                              name={`parts[${index}].price`}
                              value={part?.price}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='GST'
                              name={`parts[${index}].gst`}
                              value={part?.gst}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Net Price'
                              name={`parts[${index}].net_price`}
                              value={part?.net_price}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Extd Gross Price'
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
                      </tbody>
                    );
                  })}
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
            value='Add Sales Order'
          />
        </div>
      </form>
    </div>
  );
}
