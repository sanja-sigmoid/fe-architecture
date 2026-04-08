import { QueryClient, type DefaultOptions, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const queryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  };
  
  export type QueryConfig<FetcherFnType extends (...args: any) => any> = UseQueryOptions<
    Awaited<ReturnType<FetcherFnType>>,
    AxiosError<any>
  >;
  
  export type MutationConfig<FetcherFnType extends (...args: any) => any> = UseMutationOptions<
  Awaited<ReturnType<FetcherFnType>>,
  AxiosError<any>,
  Parameters<FetcherFnType>[0]
>;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
