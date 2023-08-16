import { Toast } from "@components/Toast";
import { UserLayout } from "@layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
export default function TambahBarang() {
  const [isShownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [inputs, setInputs]: any = useState({})
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
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
      router.push('/kategori')
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
        <h1 className="mb-3">Buat Barang  Baru</h1>
        <form action="" className="mt-3" onSubmit={handleSubmit} encType="">
          <Form.Group className="mb-3" >
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control type="text" placeholder="Nama Barang" name="nama" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control type="text" placeholder="Kode Barang" name="kode" onChange={handleChange} />
            <small className="font-italic text-danger">Masukan Kode Barang dengan Huruf besar</small>
          </Form.Group>

          <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
        </form>
      </div>


    </UserLayout>
  )
} 