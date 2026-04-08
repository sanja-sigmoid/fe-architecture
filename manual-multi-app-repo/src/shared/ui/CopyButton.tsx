import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

interface CopyButtonProps {
  value: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleClick = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setOpenTooltip(true);
    setCopied(true);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);

    if (copied) {
      setCopied(false);
    }
  };

  return (
    <Tooltip
      title={copied ? 'It is copied' : 'It is not copied'}
      onClose={handleTooltipClose}
      open={openTooltip}
    >
      <IconButton
        onClick={() => handleClick(value || "")}
        onMouseEnter={handleTooltipOpen}
        onMouseLeave={handleTooltipClose}
      >
        <ContentCopy />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
