import { Toast } from "@components/Toast";
import { UserLayout } from "@layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
export default function TambahKategori() {
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
      await axios.post('/api/users/create', inputs)
      router.push('/karyawan')
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
        <h1 className="mb-3">Buat Karyawan  Baru</h1>
        <form action="" className="mt-3" onSubmit={handleSubmit} encType="">
          <Form.Group className="mb-3" >
            <Form.Label>Nama Karyawan</Form.Label>
            <Form.Control type="text" placeholder="Nama karyawan" name="nama" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Username Karyawan</Form.Label>
            <Form.Control type="text" placeholder="Username karyawan" name="username" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Password Karyawan</Form.Label>
            <Form.Control type="password" placeholder="password karyawan" name="password" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Jabatan Karyawan</Form.Label>
            <Form.Select aria-label="Default select example" name="jabatan" onChange={handleChange}>
              <option value="manager_operasional">Manager Operasional</option>
              <option value="tim_penerimaan_barang">Tim Penerimaan Barang</option>
              <option value="tim_pengambilan_barang">Tim Pengambilan Barang</option>
              <option value="manager_kualitas">Tim Verifikasi Kualitas</option>
            </Form.Select>
          </Form.Group>
          <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
        </form>
      </div>

      
    </UserLayout>
  )
} 