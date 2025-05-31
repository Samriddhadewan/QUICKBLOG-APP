import { div, li } from "motion/react-client"
import { assets, footer_data } from "../assets/assets"

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">


        <div>
            <img src={assets.logo} className="w-32 sm:w-44" alt="" />
            <p className="max-w-[410px] mt-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, provident esse! Animi, accusamus quo maxime commodi odit, voluptate, totam laborum dolorum libero pariatur repellendus impedit doloremque quis atque nobis vel.</p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {
            footer_data.map((section,index)=> (
              <div key={index}>
                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                <ul>
                {section.links.map((item, index)=>
                  <li key={index}>
                    <a className="hover:underline transition" href="#">{item}</a>
                  </li>
                )}
                </ul>
              </div>
            ))
          }
        </div>

        </div>
        <p className="px-4 text-center text-sm md:text-base text-gray-500/80">Copyright 2025, Quickblog Samriddha - All Right Reserved.</p>
    </footer>
  )
}

export default Footer