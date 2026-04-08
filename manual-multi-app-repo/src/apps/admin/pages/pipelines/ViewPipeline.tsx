import { Avatar, Box, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography } from "@mui/material";
import type { GridColDef, GridRowId } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { AddBoxOutlined } from "@mui/icons-material";
import { useOnEnter } from "../../../../shared/hooks/useOnEnter";
import CcsTable, { DEFAULT_HEADER_DEF } from "../../../../shared/ui/CcsTable";
import CopyButton from "../../../../shared/ui/CopyButton";
import { dateStringFromDate, formatNumber } from "../../../../shared/utils/formatting/Formatting";
import { PipelineStatus } from "../../api/pipelines/types";

const COLUMN_DEF: GridColDef[] = [
  {
    ...DEFAULT_HEADER_DEF,
    headerName: "Name",
    field: "pipelineName"
  },
  {
    ...DEFAULT_HEADER_DEF,
    headerName: "Model",
    field: "modelName"
  },
  {
    ...DEFAULT_HEADER_DEF,
    headerName: "Generated Input Tokens (Month)",
    field: "totalInputTokens",
    renderCell: (params) => formatNumber(params.value)
  },
  {
    ...DEFAULT_HEADER_DEF,
    headerName: "Generated Output Tokens (Month)",
    field: "totalOutputTokens",
    renderCell: (params) => formatNumber(params.value)
  }
];

const ViewPipelines: React.FC = () => {
  const me = {
    organizationName: "Sigmoid"
  };

  const now = useMemo(() => DateTime.utc(), []);

  const [searchParams, setSearchParams] = useSearchParams();

  const activePipelineId = searchParams?.get("pipelineId") ?? "";

  const pipelines = [
    {
      accountId: "demo.inference@cirrascale.com",
      status: 1,
      pipelineId: "550e8400-e29b-41d4-a716-446655440000",
      pipelineName: "Meta Llama 3.1 70B",
      url: "https://pipeline1-acva.cirrascale.ai/",
      apiKey: "cb0183c1-83ef-48d1-8d2e-48d748a9d645",
      region: "US Central / US West",
      maxTheoreticalTokenVolume: 2000000000,
      maxPurchasedTokenVolume: 6000000000,
      modelName: "Cirrascale/Meta Llama 3.1 70B",
      modelVersion: "1.0",
      assignedTimestamp: 1733050924,
      removedTimestamp: null,
      pipelineType: "Burstable",
      burstTimeframe: "0200 - 0800 UTC",
      burstRatio: "2:1",
      aiNodeCount: 4,
      totalOutputTokens: 176167172,
      totalInputTokens: 6112822
    },
    {
      accountId: "demo.inference@cirrascale.com",
      status: 1,
      pipelineId: "4dc93aeb-a9e5-413f-ab66-178be2ec2049",
      pipelineName: "llava-v1.6-34b-hf",
      url: "https://pipeline2-rgsa.cirrascale.ai/",
      apiKey: "55df2ad2-5e9f-4c98-a4e9-420f1d0c5ab5",
      region: "US Central",
      maxTheoreticalTokenVolume: 6000000000,
      maxPurchasedTokenVolume: 2000000000,
      modelName: "Cirrascale/llava-v1.6-34b-hf",
      modelVersion: "1.0",
      assignedTimestamp: 1733310124,
      removedTimestamp: null,
      pipelineType: "Burstable",
      burstTimeframe: "0200 - 0800 UTC",
      burstRatio: "2:1",
      aiNodeCount: 4,
      totalOutputTokens: 176167172,
      totalInputTokens: 6112822
    }
  ];

  const activePipeline = pipelines?.find((p) => p.pipelineId === activePipelineId);

  const selectPipeline = (pipelineId: GridRowId) => {
    setSearchParams((currentSearchParams) => {
      if (pipelineId) {
        currentSearchParams.set("pipelineId", pipelineId.toString());
      } else {
        currentSearchParams.delete("pipelineId");
      }

      return currentSearchParams;
    });
  };

  const selectPipelineOnEnter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("pipelineId", "550e8400-e29b-41d4-a716-446655440000");
    setSearchParams(newParams);
  };

  useOnEnter(selectPipelineOnEnter);

  useEffect(() => {
    if (pipelines?.length && !activePipelineId) {
      setSearchParams((currentSearchParams) => {
        currentSearchParams.set("pipelineId", pipelines[0].pipelineId.toString());

        return currentSearchParams;
      });
    }
  }, [pipelines, searchParams, setSearchParams, activePipelineId]);

  return (
    <Box m={3} display={"flex"} flexDirection={"column"} gap={3}>
      <Stack direction="row" justifyContent="start">
        <Typography variant="h4" data-testid="view-pipelines-title">
          {"Pipelines"}
        </Typography>
      </Stack>
      <Card data-testid="view-pipelines-card">
        <CardHeader title={"Pipeline Title"} />
        <CardContent>
          <CcsTable
            data-testid="view-pipelines-table"
            rows={pipelines || []}
            columns={COLUMN_DEF}
            getRowId={(row) => row.pipelineId}
            disableRowSelectionOnClick={false}
            onRowSelectionModelChange={(model) => {
              const firstId = [...model.ids][0];
              selectPipeline(firstId as string);
            }}
            rowSelectionModel={
              activePipelineId
                ? { type: "include", ids: new Set([activePipelineId]) }
                : { type: "include", ids: new Set() }
            }
          />
        </CardContent>
      </Card>
      {pipelines && activePipelineId ? (
        <Card>
          <CardHeader
            title={activePipeline?.pipelineName}
            subheader={activePipeline?.modelName}
            avatar={
              <Avatar
                src={`/images/pipeline-model/${activePipeline?.modelName.split("/")[0].toLowerCase()}.png`}
                alt={activePipeline?.modelName}
                variant="rounded"
                style={{
                  backgroundColor: "transparent"
                }}
                slotProps={{
                  img: {
                    style: {
                      objectFit: "contain"
                    }
                  }
                }}
              >
                <AddBoxOutlined />
              </Avatar>
            }
          />
          <CardContent>
            <Grid container rowGap={2}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Status"}
                  </Typography>
                  <Box mt={"4px"}>
                    <Chip
                      label={PipelineStatus[(activePipeline?.status as PipelineStatus) ?? PipelineStatus.Dev]}
                      color={
                        activePipeline?.status === PipelineStatus.Inactive
                          ? "error"
                          : activePipeline?.status === PipelineStatus.Active
                          ? "success"
                          : "default"
                      }
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Version"}
                  </Typography>
                  <Typography variant="body1">{activePipeline?.modelVersion}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Endpoint Url"}
                  </Typography>
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Typography variant="body1">{activePipeline?.url}</Typography>
                    <CopyButton value={activePipeline?.url || ""} />
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Node count"}
                  </Typography>
                  <Typography variant="body1">{activePipeline?.aiNodeCount}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Region"}
                  </Typography>
                  <Typography variant="body1">{activePipeline?.region}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Api Key"}
                  </Typography>
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Typography variant="body1">{"•".repeat(activePipeline?.apiKey?.length || 10)}</Typography>
                    <CopyButton value={activePipeline?.apiKey || ""} />
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Output Tokens"}
                  </Typography>
                  <Typography variant="body1">{formatNumber(activePipeline?.totalOutputTokens || 0)}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Input Tokens"}
                  </Typography>
                  <Typography variant="body1">{formatNumber(activePipeline?.totalInputTokens || 0)}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Max Token Volume"}
                  </Typography>
                  <Typography variant="body1">{formatNumber(activePipeline?.maxPurchasedTokenVolume || 0)}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Type"}
                  </Typography>
                  <Typography variant="body1">{activePipeline?.pipelineType}</Typography>
                </Box>
              </Grid>
              {activePipeline?.pipelineType === "Burstable" && (
                <>
                  <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        {"Burst Ratio"}
                      </Typography>
                      <Typography variant="body1">{activePipeline?.burstRatio}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        {"Burst Timeframe"}
                      </Typography>
                      <Typography variant="body1">
                        {activePipeline?.burstTimeframe.replace("UTC", DateTime.local().offsetNameShort)}
                      </Typography>
                    </Box>
                  </Grid>
                </>
              )}
              <Grid size={{ xs: 6, md: 4 }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {"Assigned Timestamp"}
                  </Typography>
                  <Typography variant="body1">
                    {dateStringFromDate(DateTime.fromSeconds(activePipeline?.assignedTimestamp || 0), {
                      ...DateTime.DATETIME_FULL,
                      hour12: false
                    })}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
};

export default ViewPipelines;
