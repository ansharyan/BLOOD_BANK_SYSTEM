import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'
const AdminHome = () => {
  const {user}=useSelector(state=>state.auth)
  return (
    <Layout>
      <div className="container">
        <div className="d-flex      flex-column mt-4">
          <h1>Welcome Admin <i className='text-success'>{user?.name}</i></h1>
          <p>Manage Blood Bank App</p>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto fugiat recusandae consectetur perspiciatis quaerat repudiandae! Earum, eius unde? Incidunt sint atque porro aperiam libero nostrum perspiciatis tempore! Nobis deserunt impedit cum cupiditate error doloribus numquam commodi, pariatur consequuntur expedita id qui maxime deleniti corporis doloremque aperiam veritatis sapiente nesciunt ut quam quaerat eveniet eius. Nostrum ab repellendus, quae eos sit est commodi pariatur facilis reprehenderit sint non hic aut explicabo illo optio corrupti aperiam id nihil expedita officia atque. Architecto repellat odio tempore? Eveniet in voluptas, obcaecati quia quas deleniti et modi, odit suscipit, quo reiciendis nemo minima placeat sapiente aliquid incidunt nostrum repudiandae voluptatum qui unde ipsa officia ex. Officiis laborum autem iste placeat tempora? Dignissimos aperiam delectus fugiat a explicabo fugit similique? Corrupti voluptatem explicabo nisi sed sapiente vitae ex atque, illum officia laudantium unde. Blanditiis id doloribus, ullam quasi perspiciatis ratione, possimus fuga recusandae ea eaque repellat exercitationem similique iusto in sapiente! Rerum voluptas ducimus quas ullam dolorem, dolorum commodi nulla atque esse assumenda tempore nisi iure et cumque illo ipsum! Commodi ad odit est, consequuntur dicta non architecto at eligendi autem vel maiores, neque deserunt tempora sed similique! Id error rem cum ut tempora, deleniti vitae?
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome