import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { useOnEnter } from "../../../../shared/hooks/useOnEnter";
import CopyButton from "../../../../shared/ui/CopyButton";
import { dateStringFromDate } from "../../../../shared/utils/formatting/Formatting";
import type { AIModel } from "../../api/models/types";

type CATALOG = "CIRRASCALE" | "OTHER";
const ENABLE_CATALOG_SELECT = false;

const CatalogMap: Record<CATALOG, string> = {
  CIRRASCALE: "Cirrascale",
  OTHER: "Other"
};

const ModelCatalog = () => {
  const [catalog, setCatalog] = useState<CATALOG>("CIRRASCALE");

  const navigate = useNavigate();

  const handleCustomPipelineRequest = () => {
    window.location.href = "https://forms.office.com/r/vgati6s2hZ";
  };

  const handlePipelineRequest = (model: AIModel) => {
    if (model.huggingFaceModelName) {
      navigate({
        pathname: `/models/model`,
        search: createSearchParams({ name: model.huggingFaceModelName }).toString()
      });
    }
  };

  const modelCatalog = [
    {
      modelName: "Meta Llama 3.1 70B",
      huggingFaceModelName: "meta-llama/Llama-3.1-70B",
      dateUpdated: 1737373808,
      version: "3.1",
      status: 1,
      archiveLocation: "",
      setupScripts: null
    },
    {
      modelName: "LLaVa-v1.6-34b-hf",
      huggingFaceModelName: "llava-hf/llava-v1.6-34b-hf",
      dateUpdated: 1737373808,
      version: "1.6",
      status: 1,
      archiveLocation: "",
      setupScripts: null
    },
    {
      modelName: "DeepSeek-R1",
      huggingFaceModelName: "deepseek-ai/DeepSeek-R1",
      dateUpdated: 1737373808,
      version: "1.0",
      status: 1,
      archiveLocation: "",
      setupScripts: null
    },
    {
      modelName: "Meta Llama-3.3-70B-Instruct",
      huggingFaceModelName: "meta-llama/Llama-3.3-70B-Instruct",
      dateUpdated: 1737373808,
      version: "3.3",
      status: 1,
      archiveLocation: "",
      setupScripts: null
    },
    {
      modelName: "Mistral-7B-v0.3",
      huggingFaceModelName: "mistralai/Mistral-7B-v0.3",
      dateUpdated: 1736941808,
      version: "0.3",
      status: 1,
      archiveLocation: "",
      setupScripts: null
    },
    {
      modelName: "Microsoft OmniParser",
      huggingFaceModelName: "microsoft/OmniParser",
      dateUpdated: 1714650608,
      version: "1",
      status: 2,
      archiveLocation: "",
      setupScripts: null
    }
  ];

  useOnEnter(handleCustomPipelineRequest);

  return (
    <Box m={3} display={"flex"} flexDirection={"column"} gap={3}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction="column" justifyContent="start" gap={1}>
          <Typography variant="h4" data-testid="data-catalog-page">
            {"Model Catlog"}
          </Typography>
          <Typography data-testid="data-catalog-page-instruction">
            {"Model Catalog Instruction " + CatalogMap[catalog]}
          </Typography>
        </Stack>
        {ENABLE_CATALOG_SELECT && (
          <TextField
            select
            variant="standard"
            id="catalog-select"
            label={"Select Catalog"}
            value={catalog}
            onChange={(e) => setCatalog(e.target.value as CATALOG)}
            sx={{ width: "220px" }}
          >
            <MenuItem value={"CIRRASCALE"}>{"CIRRASCALE"}</MenuItem>
            <MenuItem value={"OTHER"}>{"OTHER"}</MenuItem>
          </TextField>
        )}
      </Stack>

      <Grid container spacing={2} position={"relative"}>
        <Grid size={6}>
          <Card sx={{ mb: 6 }}>
            <CardHeader title={"Model Card Title"} />
            <CardContent>
              <Stack direction={"column"} spacing={2}>
                <Box>
                  <Typography>{"Custom Model Card Instruction"}</Typography>
                </Box>
                <Box>
                  <Button
                    id="custom-model"
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={handleCustomPipelineRequest}
                  >
                    {"Request Model Card"}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Typography data-testid="data-catalog-page" sx={{ width: "70%" }}>
          {"Model Catalog General Info " + CatalogMap[catalog]}
        </Typography>
        {modelCatalog &&
          modelCatalog.map((model) => (
            <Grid size={6} key={model.modelName}>
              <Card>
                <CardHeader
                  title={model.modelName}
                  action={
                    <Tooltip title={"Model Name"}>
                      <IconButton
                        href={`https://huggingface.co/${model.huggingFaceModelName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    </Tooltip>
                  }
                ></CardHeader>
                <CardContent>
                  <Stack direction={"column"} spacing={2}>
                    <Box>
                      <Typography variant="body2" color="textDisabled">
                        {"Model Name"}
                      </Typography>
                      <Typography>{model.huggingFaceModelName}</Typography>
                    </Box>
                    <Box display={"flex"}>
                      <Box>
                        <Typography variant="body2" color="textDisabled">
                          {"Last Updated"}
                        </Typography>
                        <Typography>
                          {dateStringFromDate(DateTime.fromSeconds(model.dateUpdated), DateTime.DATE_MED)}
                        </Typography>
                      </Box>

                      <CopyButton value={"Is it updated"} />
                    </Box>
                    <Box>
                      <Button
                        id={model.modelName}
                        size="medium"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          handlePipelineRequest(model);
                        }}
                      >
                        {"Request"}
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ModelCatalog;
