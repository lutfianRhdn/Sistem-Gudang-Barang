import Table from "@components/Table/Table";
import { UserLayout } from "@layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Barang() {
  const [role, setRole] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const user = await axios.get('/api/mock/me')
      console.log(user.data.jabatan)
      setRole(user.data.jabatan)
      
    })()
  }, [])
  useEffect(() => {
    // if (role == '') return;
    axios.get('/api/barang').then((res) => {
      const barangMapped = res.data.map((item: any) => {
        return {
          nama: item.nama,
          kode: item.kode,
          kategori: item.kategori.nama,
          lokasi: item.lokasi.join(', '),
          jumlah: item.jumlah,
          detail: addDetail(item.id, role)
        }
      })
      setData(barangMapped)

    });
    // (async () => {
    //   const barang = await axios.get('/api/barang')
      
    //   console.log(barangMapped)
    // })
  }, [role])

  const button = (href:string,title:string,color:string,id:number) => {
    return (
    <>  
        <Link href={`${href}/${id}`} className={`btn btn-${color} mx-2`}>{title }
        </Link>
      </>

        )
      } 
      const addDetail = (id: number,roleName:string) => {
    return (
      <div className="d-flex justify-content-center">
      {(roleName == 'tim_penerimaan_barang') ?
          button('/barang/masuk', 'Barang Masuk', 'primary', id) : (roleName == 'tim_pengambilan_barang' ? (
            button('/barang/keluar', 'Barang Keluar', 'primary', id)
            ) : (roleName == 'manager_kualitas' ? (
              <>
            { button('/barang/kualitas', 'Kualitas Barang', 'primary', id)}
              </>

          ):(
            <>
              {button('/barang/masuk', 'Barang Masuk', 'primary', 1)}
                {button('/barang/keluar', 'Barang Keluar', 'primary', 1)}
                {button('/barang/kualitas', 'Kualitas Barang', 'primary', 1)}

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
      <Table datas={data} headers={['nama', 'kode', 'kategori','lokasi','jumlah','detail']} isHiddenAction={true} />
    </UserLayout>
  )
}