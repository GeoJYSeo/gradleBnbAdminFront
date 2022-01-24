
export const constant = {
  SIGNIN_ITEMS: {
    EMAIL: 'email',
    LAST_NAME: 'lastname',
    FIRST_NAME: 'firstname',
    PASSWORD: 'password',
    CHECK_PASSWORD: 'checkPassword',
    MONTH: 'Month',
    DAY: 'Day',
    YEAR: 'Year',
  },
  INPUT_TYPES: {
    EMAIL: 'eamil',
    TEXT: 'text',
    PASSWORD: 'password',
  },
  ERROR_MESSAGES: {
    REQUIRED: {
      EMAIL: 'Please Enter a valid Email.',
      LAST_NAME: 'Please Enter a valid Last Name.',
      FIRST_NAME: 'Please Enter a valid First Name.',
      PASSWORD: 'Please Enter a valid Password.',
      BIRTHDAY: 'Please select the birthday.'
    },
    SAME: {
      CHECK_PASSWORD: 'Please Enter the same Password.',
    }
  },
  ROOM_REGISTER_ITEMS: {
    // 숙소 유형 radio options
    ROOM_TYPE_RADIO_OPTIONS: [
      {
        label: 'Entire',
        value: 'entire',
        description: 'The guest can use the entire accommodation not sharing it with anyone. It usually includes a bedroom, bathroom and kitchen.'
      },
      {
        label: 'Private',
        value: 'private',
        description: 'The guests are provided with a private room. The other places might be shared.'
      },
      {
        label: 'Public',
        value: 'public',
        description: 'The guests stay in a shared room bedroom or public spaces with no private room.'
      },
    ],
    // 게스트만 사용하도록 만들어진 숙소인지 라디오 options
    IS_SET_UP_FOR_GUEST_OPTIONS: [
      {
        label: 'Yes, It is set up for the guests.',
        value: true
      },
      {
        label: 'No, There are owner\'s belongings in the accommodation.',
        value: false
      },
    ],
    BUTTON_COLOR: {
      DARK_CYAN: 'dark_cyan'
    }
  }
}
