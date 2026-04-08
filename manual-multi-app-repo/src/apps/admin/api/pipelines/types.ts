export interface InferenceTokenUsage {
    model: string;
    machineId: string;
    timestamp: number;
    inferenceSecondsSum: number;
    inferenceSecondsAvg: number;
    inferenceSecondsMedian: number;
    inferenceSecondsMax: number;
    inferenceSecondsMin: number;
    numInferenceReadings: number;
  }

  export enum PipelineStatus {
    Dev = 0,
    Active = 1,
    Inactive = 2
  }
  
  
  export interface TokenMaxUsage {
    machineId: string;
    timestamp: number;
    percentMax: number;
  }
  
  export interface SystemUtilization {
    machineId: string;
    timestamp: number;
    gpuUtilizationAvg: number;
    gpuUtilizationMedian: number;
    gpuUtilizationMax: number;
    gpuUtilizationMin: number;
    numGPUUtilizationReadings: number;
    gpuMemoryUtilizationAvg: number;
    gpuMemoryUtilizationMedian: number;
    gpuMemoryUtilizationMax: number;
    gpuMemoryUtilizationMin: number;
    gpuMemoryUtilizationReadings: number;
    cpuUtilizationAvg: number;
    cpuUtilizationMedian: number;
    cpuUtilizationMax: number;
    cpuUtilizationMin: number;
    cpuUtilizationReadings: number;
    ramUtilizationAvg: number;
    ramUtilizationMedian: number;
    ramUtilizationMax: number;
    ramUtilizationMin: number;
    ramUtilizationReadings: number;
  }
  
  export interface MachineStatus {
    machineId: string;
    timestamp: number;
    status: string;
  }
  
  export interface AiNodeMetrics {
    accountId: string;
    pipelineId: string;
    aiNodeId: string;
    timestamp: number;
    inputTokens: number;
    outputTokens: number;
  }
  
  export interface PipelineMetrics {
    accountId: string;
    pipelineId: string;
    timestamp: number;
    totalInputTokens: number;
    totalOutputTokens: number;
    aiNodeCount: number;
  }
  
  export interface PipelineMetricsRegion {
    accountId: string;
    pipelineId: string;
    timestamp: number;
    inputTokens: number;
    outputTokens: number;
    aiNodeId: string;
  }
  
  export interface PipelineMetricsExtended {
    accountId: string;
    status: number;
    pipelineId: string;
    pipelineName: string;
    url: string;
    apiKey: string;
    region: string;
    maxTheoreticalTokenVolume: number;
    maxPurchasedTokenVolume: number;
    modelName: string;
    modelVersion: string;
    assignedTimestamp: number;
    removedTimestamp: number | null;
    timestamp: number;
    totalInputTokens: number;
    totalOutputTokens: number;
    aiNodeCount: number;
    pipelineType: string;
    burstTimeframe: string;
    burstRatio: string;
  }
  
  export type MetricInterval = "OneMinute" | "Hourly" | "Daily" | "Weekly" | "Monthly" | "Yearly";
  
  export type Frequency = "ten_minute" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  