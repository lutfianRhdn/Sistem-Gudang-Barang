'use client'
import { BarangCard } from "@components/BarangCard";
import { UserLayout } from "@layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Barang_Masuk({ props }:any) {
  const router = useRouter()
  const { id } = router.query
  const{type} = router.query

  const [data, setData] = useState([])
  const [role, setRole] = useState('')
  const [namaBarang, setNamaBarang] = useState('')
  useEffect(() => {
    if(!id || !type) return 
    (async () => {
      const user = await axios.get('/api/mock/me')
      setRole(user.data.jabatan)
      const barang = await axios.get(`/api/barang/${id}`)
      setNamaBarang(barang.data.nama)
      const barang_masuk = await axios.get(`/api/barang${type}/${id}`)
      console.log(barang_masuk.data)
      setData(barang_masuk.data)
    })()
  }, [id,type])
 
  return (
    <UserLayout>
      <h1>{ namaBarang}</h1>
      {(role !== 'manager_operasional') && (
        <>
          <Link href={`/barang/${type}/tambah/${id}`} className="btn btn-primary mx-2 my-3">Tambah Barang</Link>
        </>
        )}
      <Row >

      {data.length !==0 &&data.map((item) => 
        <Col md="4" className="my-3">
          <BarangCard id={item.id} nama_barang={item.barang.nama} jumlah={item.jumlah} nama={item.nama_pemasok || item.nama_penerima} nama_user={item.user.nama} status_pemeriksaan={item.status} tanggal={new Date(item.tanggal)} type={type==='masuk'?'penerimaan':'pengambilan' } />
        
        </Col>
        )}
      </Row>

    </UserLayout>
  )
}