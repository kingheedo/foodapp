import {AddressResponse} from '@/types/kakaoMap';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

interface IUseSearchLocationProps {
  keyword: string;
  location: LatLng;
}

const useSearchLocation = ({keyword, location}: IUseSearchLocationProps) => {
  const [addressInfo, setAddressInfo] = useState<AddressResponse | null>(null);
  const [pageParam, setPageParam] = useState(1);
  console.log('pageParam', pageParam);

  /** 이전 클릭 시
   *
   * 1이 아닐때 까지만
   */
  const fetchPrevPage = () => {
    if (pageParam !== 1) {
      setPageParam(prev => prev - 1);
    }
  };

  /** 다음 클릭 시
   *
   * 최대 pageable_count 까지만
   */
  const fetchNextPage = () => {
    if (!addressInfo) {
      return;
    }
    if (!addressInfo.meta.is_end) {
      setPageParam(prev => prev + 1);
    }
  };

  useEffect(() => {
    (async () => {
      if (!keyword) {
        setPageParam(1);
        setAddressInfo(null);

        return;
      }
      try {
        const {data} = await axios.get<AddressResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${
            location.latitude
          }&x=${location.longitude}&size=${6}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        console.log('data', data);

        setAddressInfo(data);
      } catch (error) {
        console.log('error', error);
        setAddressInfo(null);
      }
    })();
  }, [keyword, location, pageParam]);

  return {
    addressInfo,
    fetchPrevPage,
    fetchNextPage,
  };
};

export default useSearchLocation;
