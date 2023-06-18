import { gql } from "@apollo/client";


/**************************Blog******************************/
export const ADD_BLOG = gql`
mutation article_addArticle(
  $title: String!
  $content: String!
  $description: String
  $languageType: LanguageType!
  $hashTags: [String!]
  $coverImageName: String!
) {
  article_addArticle(input: {
      title: $title
      content: $content
      description: $description
      hashTags: $hashTags
      languageType: $languageType
      coverImageName: $coverImageName
    }
  ) {
    result {
      title
      description
      content
      hashTags
    }
    status {
      code
      value
    }
  }
}
`;

export const UPDATE_BLOG = gql`
mutation article_updateArticle(
  $title: String!
  $content: String!
  $description: String
  $languageType: LanguageType!
  $hashTags: [String!]
  $coverImageName: String!
  $articleId: Int!
) {
  article_updateArticle(
    input: {
      title: $title
      content: $content
      description: $description
      hashTags: $hashTags
      languageType: $languageType
      coverImageName: $coverImageName
      id: $articleId
    }
  ) {
    result {
      title
      content
      description
      hashTags
      id
    }
    status {
      code
      value
    }
  }
}
`;

export const DELETE_BLOG = gql`
mutation article_deleteArticle($id: Int!) {
  article_deleteArticle(entityId: $id) {
    result {
      id
    }
    status {
      code
      value
    }
  }
}
`;






/**************************Appointment******************************/
export const ADD_APPOINTMENT = gql`
mutation appointment_addAppointment(
  $date: Date!
  $doctorId: String!
  $startTime: TimeSpan!
  $endTime: TimeSpan!
  $firstName: String!
  $lastName: String!
  $phoneNumber: String!
  $verificationCode: String!
  $languageType: LanguageType!
) {
  appointment_addAppointment(
    input: {
      date: $date
      doctorId: $doctorId
      startTime: $startTime
      endTime: $endTime
      patientFirstName: $firstName
      patientLastName: $lastName
      phoneNumber: $phoneNumber
      verificationCode: $verificationCode
      languageType: $languageType
    }
  ) {
    result {
      patientId
      createdDate
      date
      startTime
      endTime
      appointmentType
      doctorId
      trackingNumber
      languageType
    }
    status {
      code
      value
    }
  }
}
`;


export const SEND_VERIFICATION_CODE = gql`
mutation user_sendPhoneVerificationCode($phoneNumber: String!, $languageType: LanguageType!) {
  user_sendPhoneVerificationCode(recevier: $phoneNumber,languageType: $languageType) {
    code
    value
  }
}
`;


// user
export const USER_SIGNUP = gql`
  mutation UserSignUp(
  $email : String!
    $firstName : String!
    $lastName : String!
    $password : String!
    $confirmPassword : String!
    $phoneNumber : String
    $userType : UserType!

){
  user_signUp(input: {
    email: $email,
    firstName: $firstName,
    lastName: $lastName,
    password: $password,
    confirmPassword: $confirmPassword,
    phoneNumber: $phoneNumber,
    userType: $userType
  }) {
    code
    value
  }
}
`;

export const USER_LOGIN = gql`
  mutation user_signIn($userName : String!, $password : String!) {
  user_signIn(input: { userName: $userName, password: $password }) {
      result {
        user {
        firstName
        lastName
        id
          userRoles{
          roleType
          id
        }
      }
      token
      expireDate
    }
      status {
      code
      value
    }
  }
}
`;

/**************************FrequentQuestion******************************/
export const ADD_FREQUENT_QUESTION = gql`
mutation frequentQuestion_addFrequentQuestion($answer: String!, $question: String!, $language: LanguageType!) {
  frequentQuestion_addFrequentQuestion(
    input: { answer: $answer, question: $question, languageType: $language }
  ) {
    result {
      question
      answer
    }
    status {
      code
      value
    }
  }
}
`

export const UPDATE_FREQUENT_QUESTION = gql`
mutation frequentQuestion_updateFrequentQuestion(
  $answer: String!
  $question: String!
  $language: LanguageType!
  $FAQId: Int!
) {
  frequentQuestion_updateFrequentQuestion(
    input: {
    answer: $answer
    question: $question
    languageType: $language
    id: $FAQId
  }
  ) {
    result {
      question
      answer
      id
    }
    status {
      code
      value
    }
  }
}
`

export const DELETE_FREQUENT_QUESTION = gql`
mutation frequentQuestion_deleteFrequentQuestion($FAQId: Int!) {
  frequentQuestion_deleteFrequentQuestion(id: $FAQId) {
    result {
      question
      answer
      id
      isDeleted
    }
    status {
      code
      value
    }
  }
}
`



/**************************Question******************************/
export const ADD_QUESTION = gql`
mutation question_addQuestion(
  $content: String!
  $fullName: String!
  $languageType: LanguageType!
  $phoneNumber: String!
) {
  question_addQuestion(
    input: {
    content: $content
      fullName: $fullName
      languageType: $languageType
      phoneNumber: $phoneNumber
  }
  ) {
    result {
      fullName
      phoneNumber
      content
      id
    }
    status {
      code
      value
    }
  }
} `

export const UPDATE_QUESTION = gql`
mutation question_updateQuestion(
  $content: String!
  $fullName: String!
  $languageType: LanguageType!
  $phoneNumber: String!
  $questionId: Int!
) {
  question_updateQuestion(
    input: {
      content: $content
      fullName: $fullName
      languageType: $languageType
      phoneNumber: $phoneNumber
      id: $questionId
  }
  ) {
    result {
      fullName
      phoneNumber
      content
      isAnswered
      isApproved
    }
    status {
      code
      value
    }
  }
}
`
export const DELETE_QUESTION = gql`
mutation question_deleteQuestion($questionId: Int!) {
  question_deleteQuestion(entityId: $questionId) {
    result {
      fullName
      phoneNumber
      content
      id
    }
    status {
      code
      value
    }
  }
}
`

export const APPROVE_QUESTION = gql`
mutation question_updateQuestion(
  $content: String
  $fullName: String
  $languageType: LanguageType
  $phoneNumber: String
  $questionId: Int!
) {
  question_updateQuestion(
    input: {
      content: $content
      fullName: $fullName
      languageType: $languageType
      phoneNumber: $phoneNumber
      id: $questionId
      isApproved: true
  }
  ) {
    result {
      fullName
      phoneNumber
      content
      isAnswered
      isApproved
    }
    status {
      code
      value
    }
  }
}
`

export const DECLINE_QUESTION = gql`
mutation question_updateQuestion(
  $content: String
  $fullName: String
  $languageType: LanguageType
  $phoneNumber: String
  $questionId: Int!
) {
  question_updateQuestion(
    input: {
      content: $content
      fullName: $fullName
      languageType: $languageType
      phoneNumber: $phoneNumber
      id: $questionId
      isApproved: false
  }
  ) {
    result {
      fullName
      phoneNumber
      content
      isAnswered
      isApproved
    }
    status {
      code
      value
    }
  }
}
`


export const SEND_ADD_ANSWER_SMS = gql`
mutation question_sendAddQuestionAnswerSMS($link:String!,$questionId:Int!){
  question_sendAddQuestionAnswerSMS(dto: {link:$link,questionId:$questionId}){
    result {
      content
      content
    }
    status {
      code
      value
    }
  }
}
`


export const SEND_ADD_QUESTION_SMS = gql`
mutation question_sendAddQuestionSMS($link:String!){
  question_sendAddQuestionSMS(link:$link) {
    result {
      content
      fullName
    }
    status {
      code
      value
    }
  }
}
`

/**************************QuestionAnswer******************************/
export const ADD_QUESTION_ANSWER = gql`
mutation add_questionsAnswer(
  $content: String!
  $languageType: LanguageType!
  $questionId: Int!
) {
  questionAnswer_addQuestionAnswer(
    input: {
      content: $content
      languageType: $languageType
      questionId: $questionId
  }
  ) {
    result {
      questionId
      content
      user {
        firstName
        lastName
      }
      createdDate
      languageType
    }
    status {
      code
      value
    }
  }
}
`

export const DELETE_QUESTION_ANSWER = gql`
mutation question_deleteQuestion(
  $id: Int!
) {
  questionAnswer_deleteQuestionAnswer  (
    entityId: $id
  ) {
    result {
      content
    }
    status {
      code
      value
    }
  }
}
`


/****************************Video*******************************/
export const ADD_VIDEO = gql`
mutation videoContent_addVideoContent(
  $categoryIds: [Int!]
  $description: String!
  $hashTags: [String!]
  $languageType: LanguageType!
  $normalVideoLink: String!
  $explicitVideoLink: String!
  $thumbnail: String!
  $title: String!
  $videoName: String!
) {
  videoContent_addVideoContent(
    input: {
      categoryIds: $categoryIds
      description: $description
      hashTags: $hashTags
      languageType: $languageType
      normalVideoLink: $normalVideoLink
      explicitVideoLink: $explicitVideoLink
      thumbnail: $thumbnail
      title: $title
      videoName: $videoName
  }
  ) {
    result {
      # subtitles {
      #   subtitleLink
      #   id
      # }
      selectedCategories {
        category {
          title
          id
        }
      }
      languageType
      title
      description
      videoName
      normalVideoLink
      explicitVideoLink
      id
    }
    status {
      code
      value
    }
  }
}
`;

export const UPDATE_VIDEO = gql`
mutation videoContent_updateVideoContent(
  $categoryIds: [Int!]
  $description: String
  $hashTags: [String!]
  $languageType: LanguageType!
  $normalVideoLink: String
  $explicitVideoLink: String
  $thumbnail: String
  $id: Int!
  $title: String
) {
  videoContent_updateVideoContent(
    input: {
      categoryIds: $categoryIds
      description: $description
      hashTags: $hashTags
      languageType: $languageType
      normalVideoLink: $normalVideoLink
      explicitVideoLink: $explicitVideoLink
      thumbnail: $thumbnail
      id: $id
      title: $title
    }
  ) {
    result {
      id
      # subtitles {
      #   subtitleLink
      #   id
      # }
      selectedCategories {
        category {
          title
          id
        }
      }
      languageType
      title
      description
      videoName
      normalVideoLink
      explicitVideoLink
    }
    status {
      code
      value
    }
  }
}
`;

export const DELETE_VIDEO = gql`
mutation videoContent_deleteVideoContent($videoId: Int!) {
  videoContent_deleteVideoContent(entityID: $videoId) {
    result {
      id
      title
    }
    status {
      code
      value
    }
  }
}
`;
/**************************************Selected Category*****************************************/

export const ADD_SELECTED_CATEGORY =gql`
mutation selectedCategory_addSelectedCategory(
  $categoryId: Int!
  $videoContentId: Int!
) {
  selectedCategory_addSelectedCategory(
    input: { categoryId: $categoryId, videoContentId: $videoContentId }
  ) {
    result {
      categoryId
      videoContentId
      videoContent {
        title
        id
      }
      languageType
    }
  }
}
`


export const UPDATE_SELECTED_CATEGORY =gql`
mutation selectedCategory_updateSelectedCategory(
  $categoryId: Int!
  $videoContentId: Int!
  $id: Int!
) {
  selectedCategory_updateSelectedCategory(
    input: { categoryId: $categoryId, videoContentId: $videoContentId, id: $id }
  ) {
    result {
      id
      videoContentId
      videoContent {
        title
        id
      }
    }
  }
}
`



/**************************************Subtitle*****************************************/
export const ADD_SUBTITLE = gql`
mutation subtitle_addSubtitle(
  $languageType: LanguageType!
  $normalSubtitleLink: String!
  $explicitSubtitleLink: String!
  $videoContentId: Int!
) {
  subtitle_addSubtitle(
    input: {
      languageType: $languageType
      videoContentId: $videoContentId
      normalSubtitleLink: $normalSubtitleLink
      explicitSubtitleLink: $explicitSubtitleLink
    }
  ) {
    result {
      videoContentId
      normalSubtitleLink
      explicitSubtitleLink
      videoContent {
        title
      }
    }
    status {
      code
      value
    }
  }
}
`;

export const UPDATE_SUBTITLE = gql`
mutation subtitle_updateSubtitle(
  $languageType: LanguageType!
  $videoContentId: Int!
  $normalSubtitleLink: String!
  $explicitSubtitleLink: String!
  $subtitleId: Int!
) {
  subtitle_updateSubtitle(
    input: {
      languageType: $languageType
      normalSubtitleLink: $normalSubtitleLink
      explicitSubtitleLink: $explicitSubtitleLink
      videoContentId: $videoContentId
      id: $subtitleId
    }
  ) {
    result {
      videoContentId
      videoContentId
      normalSubtitleLink
      explicitSubtitleLink
      videoContent {
        title
      }
      id
    }
  }
}
`;

export const DELETE_SUBTITLE = gql`
mutation subtitle_deleteSubtitle($subtitleId: Int!) {
  subtitle_deleteSubtitle(entityId: $subtitleId) {
    result {
      videoContentId
      id
      isDeleted
    }
    status {
      code
      value
    }
  }
}
`;


/**************************************Doctor*****************************************/
export const ADD_DOCTOR_HOLIDAY = gql`
mutation doctorHoliday_addDoctorHoliday(
  $doctorId: String!
  $start: DateTime!
  $end: DateTime!
  $languageType: LanguageType!
) {
  doctorHoliday_addDoctorHoliday(
    input: {
      doctorId: $doctorId
      start: $start
      end: $end
      languageType: $languageType
    }
  ) {
    result {
      start
      end
      doctorId
      languageType
    }
    status {
      code
      value
    }
  }
} `


export const  DELETE_DOCTOR_HOLIDAY = gql`
mutation doctorHoliday_deleteDoctorHoliday($id:Int!){
  doctorHoliday_deleteDoctorHoliday(entityId: $id){
    result {
      start
      end
      id
    }
  }
}
`



/**************************************Comment*****************************************/

export const ADD_COMMENT = gql`
mutation comment_addComment(
  $fullName: String!
  $content: String!
  $languageType: LanguageType!
  $doctorId: String!
) {
  comment_addComment(
    input: {
      fullName: $fullName
      content: $content
      languageType: $languageType
      doctorId: $doctorId
    }
  ) {
    result {
      doctorId
      fullName
      content
      isApproved
      createdDate
      id
    }
  }
}
`;

export const UPDATE_COMMENT = gql`
mutation approve_comment($isApproved:Boolean!){
  comment_updateComment(input: {
    isApproved : $isApproved
  }){
    result {
      fullName
      content
      isApproved
      createdDate
      doctorId
    }
  }
}
`;

export const DELETE_COMMENT = gql`
mutation comment_deleteComment ($id:Int!){
  comment_deleteComment(entityId: $id) {
    result {
      id
      content
      fullName
    }
    status {
      code
      value
    }
  }
}
`;


export const APPROVE_COMMENT = gql`
mutation approve_comment($isApproved:Boolean!,$id:Int!,$languageType: LanguageType!
){
  comment_updateComment(input: {
    isApproved : $isApproved
    id: $id
    languageType:$languageType
  }){
    result {
      fullName
      content
      isApproved
      createdDate
      doctorId
    }
    status{
      code
      value
    }
  }
}
`;


export const ADD_RATING = gql`
mutation doctorRate_addDoctorRate($doctorId: String!, $rate: Int!) {
  doctorRate_addDoctorRate(input: { doctorId: $doctorId, rate: $rate }) {
    result {
      rate
      doctorId
      id
    }
    status {
      code
      value
    }
  }
}
`;