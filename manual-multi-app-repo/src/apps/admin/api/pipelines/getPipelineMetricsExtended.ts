import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import type { QueryConfig } from "../../../../shared/libs/reactQuery/reactQuery";
import type { Frequency, PipelineMetricsExtended } from "./types";

export const getPipelineMetricsExtended = async (
  accountId: string,
  startTimestamp: number,
  endTimestamp: number,
  frequency: Frequency
): Promise<PipelineMetricsExtended[]> => {
  const response = await axios.get(
    `/PipelineMetrics/GetByAccountExtended/${accountId}/?frequency=${frequency}&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`
  );

  return response.data;
};

type Options = {
  config?: QueryConfig<typeof getPipelineMetricsExtended>;
  accountId: string;
  startTimestamp: number;
  endTimestamp: number;
  frequency: Frequency;
};

export const useGetPipelineMetricsExtended = ({
  config,
  accountId,
  startTimestamp,
  endTimestamp,
  frequency
}: Options) => {
  return useQuery({
    queryKey: [`getPipelineMetricsExtended`, accountId, startTimestamp, endTimestamp],
    queryFn: () => getPipelineMetricsExtended(accountId, startTimestamp, endTimestamp, frequency),
    ...config
  });
};
