import { Toast } from "@components/Toast"
import { UserLayout } from "@layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"

export default function TambahBarangMasuk({ props }: any) {
  const [barang, setBarang]:any = useState({})
  const [isShownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [inputs, setInputs]: any = useState({})
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const { type } = router.query
  useEffect(() => {
    setBarang({ nama: "Harry Potter" })
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
      router.push(`/barang/${type}/${id}`)
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