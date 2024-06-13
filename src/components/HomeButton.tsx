import { SvgIcon } from "@suid/material";
import { useNavigate } from "@solidjs/router";
import type { SvgIconProps } from "@suid/material/SvgIcon";

const HomeButton = (props: SvgIconProps) => {
  const navigate = useNavigate();

  return (
    <button>
      <SvgIcon {...props} onClick={() => navigate("/polls")}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    </button>
  );
};

export default HomeButton;
