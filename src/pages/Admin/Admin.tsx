import React from 'react'
import PanelGrid from '../../components(app)/Admin/PanelGrid'
import GalleryModal from '../../components(app)/Gallery/GalleryModal'

const Admin = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <PanelGrid />
      {/* <GalleryModal open={open} onClose={() => setOpen(false)} /> */}
    </div>
  )
}

export default Admin