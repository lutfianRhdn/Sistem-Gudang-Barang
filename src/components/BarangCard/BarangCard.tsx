'use client'

import { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
type propsType = {
  id: number;
  nama_barang: string;
  jumlah?: number;
  tanggal: Date;
  nama?: string;
  status_pemeriksaan: 'kadaluarsa' | 'bagus' | 'rusak';
  nama_user: string;
  type: 'penerimaan' |'verfikasi' | 'pengambilan';
}

export default function QuizCard({ id, nama_barang, jumlah, tanggal, nama_user, nama, status_pemeriksaan, type }: propsType)  {
  const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', "Agustus", "September", "Oktober", "November", "Desember"]
  return (
    <>
      <Card className="">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h5>{nama_user}</h5>
            <h5>{jumlah ||''}</h5>
         

        </Card.Header>
        {/* {imageSrc && <Card.Img variant="top" src={imageSrc} className="shadow-sm" />} */}
        <Card.Body>
          <Card.Text>
            <div className="d-flex  justify-content-center text-center gap-5">
            

                {nama && (
                  <>
              <div>
                <p className="text-black-50">Nama {type==="penerimaan"?'Pemasok':"Pengambil" }</p>
                <h5>{nama}</h5>
              </div>
                  </>
                )}
              <div>
                <p className="text-black-50">Status Pemeriksaan</p>
                <h5>{status_pemeriksaan}</h5>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5>{tanggal.getDate()} {month[+tanggal.getMonth() ||0]} {tanggal.getFullYear()}, {tanggal.getHours()}: {tanggal.getMinutes()} </h5>
        </Card.Footer>
      </Card>
    </>
  )
}