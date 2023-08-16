import { Toast } from "@components/Toast"
import { UserLayout } from "@layout"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"

export default function TambahBarangMasuk({ props }: any) {
  const [barang, setBarang]:any = useState({})
  const [isShownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [inputs, setInputs]: any = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [userId, setUserId] = useState('')
  const router = useRouter()
  const { id } = router.query
  const { type } = router.query
  useEffect(() => {
    if (!id) return
    (async () => {
      const user = await axios.get('/api/mock/me')
      setUserId(user.data.id)
      const barang = await axios.get(`/api/barang/${id}`)
      setBarang(barang.data)
    })()
    // setBarang({ nama: "Harry Potter" })
  }, [id])
  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target as HTMLInputElement
    setInputs({ ...inputs, [name]: value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    setSubmitting(true)
    try {
      // await axios.post('/api/kategori/create', inputs)
      // //  nama_pemasok,
      // jumlah,
      //   status,
      //   id_barang,
      //   user_id,
       axios.post(`/api/barang${type}/create`, {
        jumlah: inputs.jumlah,
         nama_pemasok: inputs.nama_pemasok ||'',
         nama_penerima: inputs.nama_pemasok ||'',

        status: inputs.status_pemeriksaan,
        id_barang: id,
        user_id: userId
       }).then((res) => {
        
         router.push(`/barang/${type}/${id}`)
       }).catch((err) => {
         setIsShownToast(true)
         setToastMessage(err.response.data.message)
        })
    }
    catch (error: any) {
      setToastMessage(error.response.data.message)
      setIsShownToast(true)
    }
  }
  return (
    <UserLayout>
      
      {isShownToast && (
        <Toast
          message={toastMessage}
          type="error"
          onClick={() => setIsShownToast(false)}
        />
      )}
      <div className="bg-white  px-5 py-5 shadow-sm rounded-2">
        <h1> {type !== "kualitas" && (
          <>
            Tambah Barang {type}
          </>
        )||"Verifikasi Kualitas Barang"}</h1>
        <h5> {barang.nama}</h5>
        <form action="" className="mt-3" onSubmit={handleSubmit} encType="">
          <Form.Group className="mb-3" >
            <Form.Label>status pemeriksaan</Form.Label>
            <Form.Select placeholder="Status Pemeriksaan" name="status_pemeriksaan" onChange={handleChange} >
              <option selected disabled>Pilih Kualitas Barang</option>

              <option value="bagus">bagus</option>
              <option value='kadaluarsa'>kadaluarsa</option>
              <option value='rusak'>rusak</option>
            </Form.Select>
          </Form.Group>
          {type !== 'kualitas' && (
<>
          <Form.Group className="mb-3" >
            <Form.Label>jumlah</Form.Label>
            <Form.Control type="number" placeholder="jumlah" name="jumlah" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>nama { type ==='masuk'?'pemasok':"pengambil"}</Form.Label>
            <Form.Control type="text" placeholder={`Nama ${ type ==='masuk'?'pemasok':"pengambil"}`} name="nama_pemasok" onChange={handleChange} />
              </Form.Group>
</>

          )}

          <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
        </form>
      </div>

    </UserLayout>
  )
}