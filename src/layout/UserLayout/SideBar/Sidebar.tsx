import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import SidebarNav from './SidebarNav'
import axios from 'axios'

export default function Sidebar(props: { isShow: boolean; isShowMd: boolean }) {
  const { isShow, isShowMd } = props
  const [isNarrow, setIsNarrow] = useState(false)
  const [role, setRole] = useState('')
  const toggleIsNarrow = () => {
    const newValue = !isNarrow
    localStorage.setItem('isNarrow', newValue ? 'true' : 'false')
    setIsNarrow(newValue)
  }

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem('isNarrow')) {
      setIsNarrow(localStorage.getItem('isNarrow') === 'true')
    }
  }, [setIsNarrow])

  useEffect(() => {
    // axios.get('/api/mock/me')
    //   .then((res) => {
    //     setRole(res.data.role)
    //   })
    setRole('tim_verifikasi_kualitas')
  }, [])

  return (
    <div
      className={classNames('sidebar d-flex flex-column position-fixed h-100', {
        'sidebar-narrow': isNarrow,
        show: isShow,
        'md-hide': !isShowMd,
      })}
      id="sidebar"
    >
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
        <h5>InventoStore</h5>
      </div>

      <div className="sidebar-nav flex-fill">
        {role === 'manager_operasional' && <SidebarNav.SidebarNavManagerOperasional />}
        {role === 'tim_penerimaan_barang' && <SidebarNav.SidebarNavTimPenerimaanBarang />}
        {role === 'tim_pengambilan_barang' && <SidebarNav.SidebarNavTimPengambilanBarang />}
        {role === 'tim_verifikasi_kualitas' && <SidebarNav.SidebarNavTimVerifikasiKualitas />}

      </div>

    
    </div>
  )
}

export const SidebarOverlay = (props: { isShowSidebar: boolean; toggleSidebar: () => void }) => {
  const { isShowSidebar, toggleSidebar } = props

  return (
    <div
      tabIndex={-1}
      aria-hidden
      className={classNames('sidebar-overlay position-fixed top-0 bg-dark w-100 h-100 opacity-50', {
        'd-none': !isShowSidebar,
      })}
      onClick={toggleSidebar}
    />
  )
}
