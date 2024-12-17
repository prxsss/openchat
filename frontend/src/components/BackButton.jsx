import { useNavigate } from 'react-router';

import { HiArrowLeft } from 'react-icons/hi2';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="btn btn-circle btn-ghost"
      >
        {<HiArrowLeft className="text-primary" size={28} />}
      </button>
    </div>
  );
};
export default BackButton;
