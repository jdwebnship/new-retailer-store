import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { cancelOrder } from "../redux/slices/customerOrdersSlice";
import { CancelOrderSchema } from "../utils/validationSchema";
import LoadingButton from "../components/LoadingButton";

const cancelReasons = [
  { value: "", label: "Select Reason" },
  { value: "Ordered by Mistake", label: "Ordered by Mistake" },
  { value: "Found Cheaper Elsewhere", label: "Found Cheaper Elsewhere" },
  { value: "Delivery Time is Too Long", label: "Delivery Time is Too Long" },
  { value: "Changed My Mind", label: "Changed My Mind" },
  {
    value: "Product Details Are Incorrect",
    label: "Product Details Are Incorrect",
  },
  { value: "Payment Issue", label: "Payment Issue" },
  { value: "Quantity Issue", label: "Quantity Issue" },
  { value: "Not Needed Anymore", label: "Not Needed Anymore" },
  { value: "Other", label: "Other" },
];

const CancelOrder = ({ open, onClose, orderId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customerOrders);

  const formik = useFormik({
    initialValues: {
      reject_reason_select: "",
      reject_reason_input: "",
    },
    validationSchema: CancelOrderSchema,
    onSubmit: (values) => {
      const payload = {
        order_id: orderId,
        reject_reason_select: values.reject_reason_select,
      };
      if (values.reject_reason_input?.trim()) {
        payload.reject_reason_input = values.reject_reason_input.trim();
      }
      dispatch(cancelOrder(payload));
      onClose();
      formik.resetForm();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[600px]">
        <h2 className="font-semibold mb-4 text-3xl">Cancel Order</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-4">
            <label
              htmlFor="rejectReasonSelectNew"
              className="block text-sm font-medium mb-1"
            >
              Select a reason
            </label>
            <select
              id="rejectReasonSelectNew"
              name="reject_reason_select"
              value={formik.values.reject_reason_select}
              onChange={(e) =>
                formik.setFieldValue("reject_reason_select", e.target.value)
              }
              onBlur={formik.handleBlur}
              className="w-full border px-3 py-2 rounded-md mb-2 focus:outline-none border-[#AAAAAA]"
            >
              {cancelReasons.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {formik.touched.reject_reason_select &&
              formik.errors.reject_reason_select && (
                <p className="text-red-500 text-sm mb-2 absolute">
                  {formik.errors.reject_reason_select}
                </p>
              )}
          </div>

          {formik.values.reject_reason_select === "Other" && (
            <div className="relative">
              <label
                htmlFor="reject_reason_input"
                className="block text-sm font-medium mb-1"
              >
                Please specify
              </label>
              <textarea
                id="reject_reason_input"
                name="reject_reason_input"
                rows="3"
                placeholder="Please specify your reason..."
                value={formik.values.reject_reason_input}
                onChange={(e) =>
                  formik.setFieldValue("reject_reason_input", e.target.value)
                }
                onBlur={formik.handleBlur}
                className="w-full border px-3 py-2 rounded-md mb- focus:outline-none border-[#AAAAAA]"
              />
              {formik.touched.reject_reason_input &&
                formik.errors.reject_reason_input && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.reject_reason_input}
                  </p>
                )}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
              className="px-4 py-2 border text-black rounded-md cursor-pointer"
            >
              Close
            </button>
            <LoadingButton
              type="submit"
              loading={loading}
              text="Confirm Cancel"
              fullWidth={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelOrder;
