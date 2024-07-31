import {getMarkers} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

const useGetMarkers = (options?: UseQueryCustomOptions<Marker[]>) => {
  return useQuery({
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    queryFn: getMarkers,
    ...options,
  });
};

export default useGetMarkers;
