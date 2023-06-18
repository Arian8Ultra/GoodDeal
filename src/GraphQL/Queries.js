import { gql } from "@apollo/client";



// Blog CONTENT




// CLINIC LOCATION
export const GET_CLINIC_LOCATION_BY_ID = gql`
query clinicLocation_getClinicLocation($id:Int!){
  clinicLocation_getClinicLocation(entityId:$id){
    result {
      address
      phone
      googleMapAddress
      clinicName
      id
    }
    status {
      code
      value
    }
  }
}
`;

export const GET_ALL_CLINIC_LOCATIONS = gql`
query clinicLocation_getClinicLocations($languageType:LanguageType){
  clinicLocation_getClinicLocations(languageType: $languageType){
    result {
      items{
        address
        phone
        googleMapAddress
        id
        clinicName
      }
    }
    status
  }
}
`;


// CATEGORY
export const GET_ALL_CATEGORIES = gql`
query category_getCategories($languageType:LanguageType!){
  category_getCategories(languageType: $languageType){
    result {
      items{
        title
        id
      }
    }
    status
  }
}
`;

export const GET_ALL_MAIN_CATEGORIES = gql`
query category_getMainCategories($languageType:LanguageType!){
  category_getMainCategories(languageType: $languageType){
    result {
      items{
        title
        id
         parent {
           parentId
           title
           id
         }
      }
    }
  }
}
`;

export const GET_CATEGORY_BY_ID = gql`
query category_getCategory($id : Int!) {
    category_getCategory(entityId: $id) {
        result {
            title
            id
        }
        }
    }
`;




//Services
export const GET_ALL_OUR_SERVICES = gql`
query ourService_getOurServices($languageType:LanguageType!
  $take: Int
  $skip: Int){
  ourService_getOurServices(languageType: $languageType){
    result(      
      order: { createdDate: DESC }
      take: $take
      skip: $skip
      ) {
      items {
        title
        content
        icon
        id
      }
    }
  }
}`





/********************************************FAQ*****************************************/
export const GET_ALL_FREQUENT_QUESTION = gql`
query frequentQuestion_getFrequentQuestions(
  $languageType: LanguageType!
  $take: Int
  $skip: Int
) {
  frequentQuestion_getFrequentQuestions(languageType: $languageType) {
    result(order: { createdDate: DESC }, take: $take, skip: $skip) {
      items {
        question
        answer
        id
        languageType
      }
    }
    status
  }
}
`


/********************************************Q&A*****************************************/
export const GET_ALL_QUESTIONS = gql`
query question_getQuestions(
  $languageType: LanguageType!
  $take: Int
  $skip: Int
) {
  question_getQuestions(languageType: $languageType) {
    result(take: $take, skip: $skip, order: { createdDate: DESC }) {
      items {
        fullName
        content
        createdDate
        id
        languageType
        isAnswered
        isApproved
        questionAnswers {
          content
          userId
          id
          user {
            firstName
            lastName
          }
          id
        }
      }
    }
    status
    __typename
  }
}
`
export const GET_ALL_APPROVED_QUESTIONS = gql`
query question_getQuestions(
  $languageType: LanguageType!
  $take: Int
  $skip: Int
) {
  question_getQuestions(languageType: $languageType) {
    result(take: $take, skip: $skip, order: { createdDate: DESC } ,where: {isApproved:{eq:true}}) {
      items {
        fullName
        content
        createdDate
        id
        languageType
        isAnswered
        isApproved
        questionAnswers {
          content
          userId
          id
          user {
            firstName
            lastName
          }
          id
        }
      }
    }
    status
    __typename
  }
}
`

export const GET_QUESTION_BY_ID = gql`
query question_getQuestion($id: Int!) {
  question_getQuestion(entityId: $id) {
    result {
      fullName
        content
        createdDate
        id
        isAnswered
        isApproved
        questionAnswers {
          content
          userId
          user {
            firstName
            lastName
          }
          id
        }
    }
    status {
      code
      value
    }
  }
}
`
export const GET_QUESTION_BY_ID_ALT = gql`
query question_getQuestions(
  $id: Int!
) {
  question_getQuestions{
    result(
    order: { createdDate: DESC }
    where: {id:{eq:$id}} 
    
    ) {
      items {
        fullName
        content
        createdDate
        id
        isAnswered
        isApproved
        questionAnswers {
          content
          userId
          user {
            firstName
            lastName
          }
          id
        }
      }
    }
    status
    __typename
  }
}
`


export const GET_QUESTION_ANSWER_BY_ID = gql`
query questionAnswer_getQuestionAnswer($id:Int!){
  questionAnswer_getQuestionAnswer(entityId: $id){
    result (order: { createdDate: DESC }){
      user {
        firstName
        lastName
      }
      content
      questionId
      id
    }
    status {
      code
      value
    }
    __typename
  }
}
`

/********************************************BLOG*****************************************/
export const GET_ALL_BLOGS = gql`
query article_getArticles(
  $languageType: LanguageType!
  $take: Int
  $skip: Int
) {
  article_getArticles(languageType: $languageType) {
    result(
      order: { createdDate: DESC }
      take: $take
      skip: $skip
    ) {
      items {
        title
        description
        coverImageName
        content
        createdDate
        id
        hashTags
      }
      totalCount
    }
    status
  }
}
`;

export const GET_ALL_RELATED_BLOGS = gql`
query article_getArticles(
  $languageType: LanguageType!
  $hashTag: String
  $skip: Int
) {
  article_getArticles(languageType: $languageType) {
    result(
      where: { hashTags: { some: { eq: $hashTag } } }
      order: { createdDate: DESC }
      take: 2
      skip: $skip
    ) {
      items {
        title
        description
        coverImageName
        content
        createdDate
        id
        hashTags
      }
    }
    status
  }
}
`;

export const GET_BLOG_BY_ID = gql`
query article_getArticle($id: Int!){
  article_getArticle(entityId: $id) {
    result {
      title
      content
      description
      hashTags
      coverImageName
      createdDate
      id
      languageType
      coverImageName
    }
    status {
      code
      value
    }
  }
}
`;

export const GET_ALL_BLOGS_BY_SEARCH = gql`
query article_getArticles(
  $languageType: LanguageType!
  $searchText: String!
  $take: Int
  $skip: Int
) {
  article_getArticles(languageType: $languageType) {
    result(
      where: { title: { contains: $searchText } }
      order: { createdDate: DESC }
      take: $take
      skip: $skip
    ) {
      items {
        title
        description
        coverImageName
        content
        createdDate
        id
        hashTags
      }
      totalCount
    }
    status
  }
}
`;





/********************************************VIDEO*****************************************/

export const GET_ALL_VIDEOS = gql`
query videoContent_getVideoContents(
  $languageType: LanguageType!
  $take: Int
  $skip: Int
) {
  videoContent_getVideoContents(languageType: $languageType) {
    result(order: { createdDate: DESC }, take: $take, skip: $skip) {
      items {
        title
        id
        createdDate
        thumbnail
        hashTags
        languageType
        selectedCategories {
          categoryId
          category {
            title
            id
          }
        }
      }
      totalCount
    }
    status
  }
}
`;


export const GET_VIDEO_BY_ID = gql`
    query videoContent_getVideoContent($id: Int!) {
        videoContent_getVideoContent(entityId: $id) {
            result {
            id
            title
            description
            videoName
            createdDate
            thumbnail
            normalVideoLink
            explicitVideoLink
            hashTags
            languageType
            selectedCategories {
              categoryId
              id
              category {
                title
                id
              }
            }
            subtitles {
              normalSubtitleLink
              explicitSubtitleLink
              languageType
              videoContentId
              }
            }
        }
    }
`;

export const GET_VIDEO_BY_SEARCH = gql`
query videoContent_getVideoContents(
  $languageType: LanguageType!
  $name: String!
  $take: Int
  $skip: Int
) {
  videoContent_getVideoContents(languageType: $languageType) {
    result(
      where: { title: { contains: $name } }
      order: { createdDate: DESC }
      take: $take
      skip: $skip
    ) {
      items {
        title
        id
        createdDate
        thumbnail
        hashTags
        languageType
        selectedCategories {
          categoryId
          category {
            title
            id
          }
        }
      }
    }
    status
  }
}
`;


export const GET_VIDEOS_BY_CATEGORY = gql`
query videoContent_getVideoContents(
  $languageType: LanguageType!
  $take: Int
  $skip: Int
  $category: String
) {
  videoContent_getVideoContents(languageType: $languageType) {
    result(
      order: { createdDate: DESC }
      take: $take
      skip: $skip
      where: {
        selectedCategories: { some: { category: { title: { contains: $category } } } }
      }
    ) {
      items {
        title
        id
        createdDate
        thumbnail
        hashTags
        languageType
        selectedCategories {
          categoryId
          category {
            title
            id
          }
        }
      }
      totalCount
    }
    status
  }
}
`;



/********************************************SUBTITLE*****************************************/
export const GET_VIDEO_SUBTITLE_BY_VIDEO_ID = gql`
query subtitle_getVideoContentSubtitles(
  $videoContentId: Int!
  $languageType: LanguageType!
) {
  subtitle_getVideoContentSubtitles(
    videoContentId: $videoContentId
    languageType: $languageType
  ) {
    result {
      items {
        videoContentId
        normalSubtitleLink
        explicitSubtitleLink
        id
        languageType
      }
    }
    status
  }
}
`


/********************************************DOCTOR*****************************************/
export const GET_ALL_DOCTORS = gql`
query doctor_getDoctors ($languageType:LanguageType){
  doctor_getDoctors (languageType: $languageType){
    result {
      items{
        resume
        firstName
        lastName
        profileImage
        biography
        dateOfBirth
        sexType
        discriminator
        about
        email
        rateSum
        rateCount
        rateAverage
        id
      }
    }
    status
  }
}
`



/********************************************DOCTOR SCHEDULE*****************************************/
export const GET_DOCTORS_HOLIDAYS = gql`
query doctorHoliday_getDoctorHolidays {
  doctorHoliday_getDoctorHolidays {
    result(      
      order: { id: DESC }
      take: 1000
      ) {
      items {
        start
        end
        id
      }
    }
    status
  }
}
`;


export const GET_DOCTORS_WORK_SCHEDULES = gql`
query doctorWorkSchedule_getDoctorWorkSchedules{
  doctorWorkSchedule_getDoctorWorkSchedules{
    result {
      items{
        clinicLocationId
        dayOfWeek
        id
        doctorWorkTimes{
          startTime
          endTime
          doctorWorkScheduleId
        }
      }
      totalCount
    }
    status
  }
}
`;

export const GET_DOCTORS_AVAILABLE_TIMES = gql`
query doctorWorkTime_getDoctorAvailableTimes ($id:Int!,$date:Date!) {
  doctorWorkTime_getDoctorAvailableTimes(doctorWorkScheduleId: $id,inputDate: $date){
    result {
      availableTimeType
      startTime
      endTime
    }
    status {
      code
      value
    }
  }
}
`;


export const GET_DOCTORS_AVAILABLE_DAYS = gql`
query doctorWorkSchedule_getDoctorAvailableDays($date:Date!,$doctorId:String!) {
  doctorWorkSchedule_getDoctorAvailableDays(
    doctorId: $doctorId
    inputDate: $date
  ) {
    result
    status {
      code
      value
    }
  }
}
`;

export const GET_DOCTORS_WORK_SCHEDULE = gql`
query doctorWorkSchedule_getDoctorWorkSchedule($id:Int!){
  doctorWorkSchedule_getDoctorWorkSchedule(entityId: $id) {
    result {
      doctorId
      clinicLocationId
       dayOfWeek
       doctor {
         firstName
         lastName
       }
       clinicLocation {
         address
         phone
         googleMapAddress
       }
       doctorWorkTimes{
         startTime
         endTime
         id
       }
    }
    status {
      code
      value
    }
  }
}
`;

export const GET_DOCTORS_WORK_SCHEDULE_BY_DOCTOR_ID = gql`
query doctorWorkSchedule_getDoctorWorkSchedules($doctorId: String!) {
  doctorWorkSchedule_getDoctorWorkSchedules {
    result(where: {doctorId:{eq:$doctorId}}){
      items{
        doctorId
        clinicLocation {
          address
          phone
          googleMapAddress
        }
        doctor {
          firstName
          lastName
        }
         id
         dayOfWeek
      }
    }
     status
  }
}
`;



export const GET_DOCTOR_WORK_SCHEDULE_BY_DATE = gql`
query doctorWorkSchedule_getDoctorAvailableDays(
  $doctorID: String!
  $date: Date!
) {
  doctorWorkSchedule_getDoctorAvailableDays(
    inputDate: $date
    doctorId: $doctorID
  ) {
    result
    status {
      code
      value
    }
  }
}
`;



/**********************************COMMENT***************************/
export const GET_COMMENTS_BY_DOCTOR_ID = gql`
query comment_getDoctorComments($doctorId:String!,$languageType: LanguageType){
  comment_getDoctorComments(doctorId: $doctorId,languageType: $languageType) {
   result(order: { createdDate: DESC }) {
     items{
      doctorId
      content
      fullName
      createdDate
      id
      isApproved
      languageType
     }
     totalCount
   } 
   status
  }
}
`;
export const GET_COMMENTS_BY_DOCTOR_ID_APPROVED = gql`
query comment_getDoctorComments($doctorId:String!,$languageType: LanguageType!
  $take:Int,$skip:Int){
  comment_getDoctorComments(doctorId: $doctorId,languageType: $languageType) {
   result(where: {isApproved:{eq:true}} order: { createdDate: DESC },
   take:$take,skip:$skip) {
     items{
      doctorId
      content
      fullName
      createdDate
      id
      isApproved
      languageType
     }
     totalCount
   } 
   status
  }
}
`;



/**********************************APPOINTMENT***************************/

export const GET_ALL_APPOINTMENTS = gql`
query appointment_getAppointments{
  appointment_getAppointments {
    result {
      items {
        patientId
        createdDate
        date
        startTime
        endTime
        appointmentType
        doctorId
        trackingNumber
        languageType
        id
      }
    }
    status
  }
}
`;

export const GET_ALL_PENDING_APPOINTMENTS = gql`
query appointment_getAppointments{
  appointment_getAppointments {
    result(where: {appointmentType:{eq:PENDING}}) {
      items {
        patientId
        createdDate
        date
        startTime
        endTime
        appointmentType
        doctorId
        trackingNumber
        languageType
        id
      }
    }
    status
  }
}
`;


export const GET_ALL_APPROVED_APPOINTMENTS = gql`
query appointment_getAppointments{
  appointment_getAppointments {
    result(where: {appointmentType:{eq:APPROVED}}) {
      items {
        patientId
        createdDate
        date
        startTime
        endTime
        appointmentType
        doctorId
        trackingNumber
        languageType
        id
      }
    }
    status
  }
}
`;

export const GET_ALL_CANCELED_APPOINTMENTS = gql`
query appointment_getAppointments{
  appointment_getAppointments {
    result(where: {appointmentType:{eq:CANCELED}}) {
      items {
        patientId
        createdDate
        date
        startTime
        endTime
        appointmentType
        doctorId
        trackingNumber
        languageType
        id
      }
    }
    status
  }
}
`;


export const GET_APPOINTMENT_BY_TRACKING_NUMBER = gql`
query appointment_getAppointments($trackingNumber:String){
  appointment_getAppointments {
    result(where: {trackingNumber:{eq:$trackingNumber}}) {
      items {
        patientId
        createdDate
        date
        startTime
        endTime
        appointmentType
        doctorId
        trackingNumber
        languageType
        id
      }
    }
    status
  }
}
`;


/**********************************SITE***************************/

export const GET_SITE_SETTINGS = gql`
  query siteSetting_getSiteSettings($languageType:LanguageType!){
    siteSetting_getSiteSettings(languageType: $languageType){
      result {
        items{
          logoName
          sitePhones
          siteMobiles
          googleMapAddress
          siteName
          siteMetaData
          supportNumber
          secretaryNumber
          companyAddress
          siteEmail
          aboutUsCollectionGallery
          appointmentAnnouncement
          aboutUsCollectivePhoto
        }
      }
      status
    }
  }
`;


export const GET_SLIDERS = gql`
query slider_getSliders($languageType:LanguageType){
  slider_getSliders(languageType: $languageType) {
    result {
      items{
        imageName
        content
        buttonLink
        id
        languageType
      }
    }
    status
  }
}
`;

export const GET_SOCIAL_MEDIA = gql`
query socialAccount_getSocialAccounts{
  socialAccount_getSocialAccounts {
    result {
      items{
        socialAddress
        socialType
        id
      }
    }
    status
  }
}
`;