import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { cancelOrder } from "../redux/slices/customerOrdersSlice";

const cancelReasons = [
  { value: "", label: "Select Reason" },
  { value: "Ordered by Mistake", label: "Ordered by Mistake" },
  { value: "Found Cheaper Elsewhere", label: "Found Cheaper Elsewhere" },
  { value: "Delivery Time is Too Long", label: "Delivery Time is Too Long" },
  { value: "Changed My Mind", label: "Changed My Mind" },
  { value: "Product Details Are Incorrect", label: "Product Details Are Incorrect" },
  { value: "Payment Issue", label: "Payment Issue" },
  { value: "Quantity Issue", label: "Quantity Issue" },
  { value: "Not Needed Anymore", label: "Not Needed Anymore" },
  { value: "Other", label: "Other" },
];

const validationSchema = Yup.object({
  reject_reason_select: Yup.string()
    .required("Please select a reason")
    .test("reason-not-empty", "Please select a valid reason", (value) => value && value.trim() !== ""),
  reject_reason_input: Yup.string().when("reject_reason_select", {
    is: "Other",
    then: (schema) =>
      schema
        .trim()
        .required("Please specify your reason")
        .min(1, "Reason cannot be empty"),
    otherwise: (schema) => schema.notRequired().nullable(),
  })
});

const CancelOrder = ({ open, onClose, orderId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      reject_reason_select: "",
      reject_reason_input: "",
    },
    validationSchema,
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Cancel Order</h2>

        <form onSubmit={formik.handleSubmit}>
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
            onChange={(e) => formik.setFieldValue("reject_reason_select", e.target.value)}
            onBlur={formik.handleBlur}
            className="w-full border px-3 py-2 rounded-md mb-2"
          >
            {cancelReasons.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {formik.touched.reject_reason_select && formik.errors.reject_reason_select && (
            <p className="text-red-500 text-sm mb-2">
              {formik.errors.reject_reason_select}
            </p>
          )}

          {formik.values.reject_reason_select === "Other" && (
            <>
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
                onChange={(e) => formik.setFieldValue("reject_reason_input", e.target.value)}
                onBlur={formik.handleBlur}
                className="w-full border px-3 py-2 rounded-md mb-2"
              />
              {formik.touched.reject_reason_input && formik.errors.reject_reason_input && (
                <p className="text-red-500 text-sm mb-2">
                  {formik.errors.reject_reason_input}
                </p>
              )}
            </>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
              className="px-4 py-2 border rounded-md bg-gray-200"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 border rounded-md bg-[#0E1422] text-white"
            >
              Confirm Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelOrder;
