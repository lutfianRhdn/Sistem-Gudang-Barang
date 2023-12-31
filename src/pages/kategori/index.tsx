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
      const kategori = await axios.get('/api/kategori')
      const kategoriMapped = kategori.data.map((item: any) => {
        return {
          id: item.id,
          nama: item.nama,
          jumlah_barang: item._count.barang,
        }
      })
      setData(kategoriMapped)
    })()
  }, [])
  return (
    <UserLayout>
      <div className="">  
        <h1>Kategori</h1>
        <Link href="/kategori/tambah" className="btn btn-primary mx-2 my-3">Tambah Kategori</Link>
      </div>

    <Table datas={data} headers={['nama','jumlah_barang']} isHiddenAction={false} />
    </UserLayout>
  )
}