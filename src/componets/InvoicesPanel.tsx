import { useNavigate } from "react-router-dom";

const InvoicesPanel = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate("create")}
        className="w-[200px] h-10 flex items-center justify-center text-slate-100 mb-5 ml-8 rounded-md shadow-lg cursor-pointer hover:bg-amber-600 transition-colors bg-orange-700"
      >
        Add New Invoice
      </div>
    </div>
  );
};

export default InvoicesPanel;
