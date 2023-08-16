'use client'
import { BarangCard } from "@components/BarangCard";
import { UserLayout } from "@layout";
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

  useEffect(() => {
    console.log(id,type)
    const dataDummy = [
      {
        id: 1,
        nama_barang: 'Harry Potter',
        jumlah: 10,
        tanggal: new Date(),
        nama_user: 'Gipar',
        status_pemeriksaan: 'bagus',
        nama: 'Ariz',

      },
      {
        id: 1,
        nama_barang: 'Harry Potter',
        jumlah: 10,
        tanggal: new Date(),
        nama_user: 'Gipar',
        status_pemeriksaan: 'bagus',
        nama: 'Ariz',

      }, {
        id: 1,
        nama_barang: 'Harry Potter',
        jumlah: 10,
        tanggal: new Date(),
        nama_user: 'Gipar',
        status_pemeriksaan: 'bagus',
        nama: 'Ariz',

      }, {
        id: 1,
        nama_barang: 'Harry Potter',
        jumlah: 10,
        tanggal: new Date(),
        nama_user: 'Gipar',
        status_pemeriksaan: 'bagus',
        nama: 'Ariz',

      }, {
        id: 1,
        nama_barang: 'Harry Potter',
        jumlah: 10,
        tanggal: new Date(),
        nama_user: 'Gipar',
        status_pemeriksaan: 'bagus',
        nama: 'Ariz',

      },
    ]
    setData(dataDummy)
    setRole('tim_penerimaan_barang')
  }, [id])
 
  return (
    <UserLayout>
      <h1>Nama Barang</h1>
      {(role === 'tim_penerimaan_barang') && (
        <>
          <Link href={`/barang/${type}/tambah/${id}`} className="btn btn-primary mx-2 my-3">Tambah Barang</Link>
        </>
        )}
      <Row >

      {data.map((item) => 
        <Col md="4" className="my-3">
          <BarangCard id={item.id}   nama_barang={item.nama_barang} nama_user={item.nama_user} status_pemeriksaan={item.status_pemeriksaan} tanggal={item.tanggal} type={type==='masuk'?'penerimaan':'pengambilan' } />
        
        </Col>
        )}
      </Row>

    </UserLayout>
  )
}