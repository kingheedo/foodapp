const errorMessages = {
  CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.',
  UNEXPECT_ERROR: '알 수 없는 에러가 발생했습니다.'
} as const;

const alerts = {
  NOT_SELECTED_LOCATION: {
    title: '추가할 위치를 선택해주세요.',
    description: '지도를 길게 누르면 위치가 선택됩니다.',
  },
  EXCEEDED_NUMBER: {
    title: '이미지 개수 초과',
    description: '추가 가능한 이미지 갯수는 최대 5개입니다.',
  },
  camera_unavailable: {
    title: '카메라 사용 불가',
    description: '디바이스 내 카메라를 사용할 수 없습니다.',
  },
  permission: {
    title: '권한 없음',
    description: '사용 권한이 없습니다.',
  },
  others: {
    title: '에러 발생',
    description: '에러가 발생하였습니다. 다시 시도해주세요.',
  },
  DELETE_POST: {
    title: '삭제하시겠습니까?',
    description: '피드와 지도에서 모두 삭제됩니다.',
  },
} as const;

export {errorMessages, alerts};
