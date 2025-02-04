import {createFileRoute} from '@tanstack/react-router'
import TopImage from '../../public/vite.svg'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <body className={"bg-[#181818] text-white"}>
      <div className={"mx-36"}>
        {/* First one */}
        <div className={"flex justify-between items-center p-4"}>
          <div className={"flex"}>
            <img src={TopImage} alt={"Image"}/>
            <h1 className={"text-4xl ml-6"}>Riskman</h1>
          </div>
          <h1>The Riskman Ontology</h1>
        </div>
        <hr className={"border-1"}></hr>
        {/* First one */}
        <div className={"flex justify-between items-center p-4"}>
          <div className={"flex"}>
            <img src={TopImage} alt={"Image"}/>
            <h1 className={"text-4xl ml-6"}>Riskman</h1>
          </div>
          <h1>The Riskman Ontology</h1>
        </div>
      </div>
      </body>
    </>
  )
}
