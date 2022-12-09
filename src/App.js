import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const [datas, setDatas] = useState([])
  const [userSelect, setUserSelect] = useState("")
  const [isShow, setIsShow] = useState(false)

  const getcov = async () => {
    const cov = await fetch("https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi")
      const value = await cov.json()
      const result = value.map(data => {
      console.log(data)
        return{
          label: data.provinsi,
          value: data.dirawat,
          value: data.kasus
        }
      })
      setDatas(result)
  }

  useEffect(() => {
    getcov()
  }, [])

  const handleChange = (value) => {
    setUserSelect(value)
  }
  const handleSubmit = () => {
      setIsShow(true)
  }
  return (
    <div className="App">
      <Select options={datas} onChange={(e) => handleChange(e.value)}></Select>
      <br></br>
      <button onClick={() => handleSubmit()}>Tampilkan Data</button>
      <h1>Jumlah Kasus Covid: {isShow ? userSelect : ""} Kasus</h1>
    </div>
  );
}

export default App;
