import Table from "@components/Table/Table";
import { UserLayout } from "@layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Barang() {
  const [role, setRole] = useState('')
  useEffect(() => {
    setRole('tim_verifikasi_kualitas')
  },[])

  const button = (href:string,title:string,color:string,id:number) => {
    return (
    <>  
        <Link href={`${href}/${id}`} className={`btn btn-${color} mx-2`}>{title }
        </Link>
      </>

        )
  } 
  const addDetail = (id: number) => {
    return (
      <div className="d-flex justify-content-center">
        {(role === 'tim_penerimaan_barang') ?
          button('/barang/masuk', 'Barang Masuk', 'primary', 1) : (role === 'tim_pengambilan_barang' ? (
            button('/barang/keluar', 'Barang Keluar', 'primary', 1)
          ) : (role === 'tim_verifikasi_kualitas' ? (
              <>
            { button('/barang/kualitas', 'Kualitas Barang', 'primary', 1)}
              </>

          ):(
            <>
              {button('/barang/masuk', 'Barang Masuk', 'primary', 1)}
                {button('/barang/keluar', 'Barang Keluar', 'primary', 1)}
                {button('/barang/kualitas', 'Barang Keluar', 'primary', 1)}

            </>
          )))}

      </div>
    )
  }
  const dataDummy = [
    {
      nama: 'Harry Potter',
      kode: 'B001',
      kategori: 'Buku',
      lokasi: 'Rak 1',
      jumlah: 10,
      detail: addDetail(1)
   } 
  ]
  return (
    <UserLayout>
      <h1>Barang</h1>
      {role === 'manager_operasional' && (
        <Link href="/barang/tambah" className="btn btn-primary mx-2 my-3">Tambah Barang</Link>
      )}
      <Table datas={dataDummy} headers={['nama', 'kode', 'kategori','lokasi','jumlah','detail']} isHiddenAction={true} />
    </UserLayout>
  )
}