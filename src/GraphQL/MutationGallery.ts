import { gql } from "@apollo/client";


export const DELETE_PHOTO = gql`
mutation photoGallery_deletePhoto($id: Int!) {
    photoGallery_deletePhoto(entityId: $id){
        code
        value
    }
}`