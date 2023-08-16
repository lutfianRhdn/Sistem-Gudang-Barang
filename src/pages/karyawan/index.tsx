'use client'
import Table from "@components/Table/Table";
import { UserLayout } from "@layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Kategori() {
  const [data, setData] = useState([])
  useEffect(() => {
    // const dataDummy = [
    //   {
    //     id: 1,
    //     nama: 'Buku',
    //     jumlah_barang: 10,

    //   },
    // ]
    // setData(dataDummy)
    (async () => {
      const users: any = await axios.get('/api/users')
      console.log(users)
      setData(users.data)
    })()
  }, [])
  return (
    <UserLayout>
      <div className="">  
        <h1>Karyawan</h1>
        <Link href="/karyawan/tambah" className="btn btn-primary mx-2 my-3">Tambah Karyawan</Link>
      </div>

      <Table datas={data} headers={['nama', 'username', 'jabatan']} isHiddenAction={false} />
    </UserLayout>
  )
}