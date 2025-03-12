import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import Header from '../components/Header'

export const Route = createFileRoute('/visualization')({
  component: RouteComponent,
})

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Import the original JavaScript directly
    const script = document.createElement('script')
    script.src = '/visualize.js'
    script.async = true
    
    // Add D3 and Plotly dependencies
    const d3Script = document.createElement('script')
    d3Script.src = 'https://d3js.org/d3.v7.min.js'
    
    const plotlyScript = document.createElement('script')
    plotlyScript.src = 'https://cdn.plot.ly/plotly-3.0.0.min.js'
    
    const html2canvasScript = document.createElement('script')
    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    
    const jspdfScript = document.createElement('script')
    jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    
    // Append scripts to document
    document.head.appendChild(d3Script)
    document.head.appendChild(plotlyScript)
    document.head.appendChild(html2canvasScript)
    document.head.appendChild(jspdfScript)
    document.body.appendChild(script)
    
    return () => {
      // Clean up scripts when component unmounts
      document.head.removeChild(d3Script)
      document.head.removeChild(plotlyScript)
      document.head.removeChild(html2canvasScript)
      document.head.removeChild(jspdfScript)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="bg-background min-h-screen p-8 font-sans text-text-primary">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div ref={containerRef} className="mt-12 p-6 bg-background rounded-lg shadow-lg border border-border-primary">
          <h2 className="text-3xl font-bold mb-6 text-center text-text-primary border-b border-border-separator pb-4">
            Interactive Data Visualization
          </h2>
          
          <div className="mb-8 p-4 bg-background rounded-lg shadow-sm border border-border-primary">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <input 
                  type="file" 
                  id="csvFile" 
                  accept=".csv" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={() => {
                    const handleFile = (window as any).handleFile
                    if (typeof handleFile === 'function') {
                      handleFile()
                    }
                  }} 
                />
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload CSV File
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="xColumn" className="block text-sm font-medium text-text-primary mb-1">X-Axis:</label>
              <select id="xColumn" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary"></select>
            </div>

            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="yColumn" className="block text-sm font-medium text-text-primary mb-1">Y-Axis:</label>
              <select id="yColumn" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary"></select>
            </div>

            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="zColumn" className="block text-sm font-medium text-text-primary mb-1">Z-Axis:</label>
              <select id="zColumn" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary"></select>
            </div>

            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="colorColumn" className="block text-sm font-medium text-text-primary mb-1">Color By:</label>
              <select id="colorColumn" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary"></select>
            </div>

            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="chartType" className="block text-sm font-medium text-text-primary mb-1">Chart Type:</label>
              <select id="chartType" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary">
                <option value="parallel">Parallel Coordinates</option>
                <option value="bar">Bar Chart</option>
                <option value="scatter2D">2D Scatter</option>
                <option value="scatter3D">3D Scatter</option>
                <option value="heatmap">Heatmap</option>
              </select>
            </div>

            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="groupByColumn" className="block text-sm font-medium text-text-primary mb-1">Group By:</label>
              <select id="groupByColumn" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary">
                <option value="">None</option>
              </select>
            </div>

            <div className="p-3 bg-background rounded-lg shadow-sm border border-border-primary">
              <label htmlFor="aggregationType" className="block text-sm font-medium text-text-primary mb-1">Aggregation:</label>
              <select id="aggregationType" className="w-full p-2 border border-border-primary rounded-md focus:ring-blue-500 focus:border-blue-500 bg-background text-text-primary">
                <option value="sum">Sum</option>
                <option value="average">Average</option>
                <option value="count">Count</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button 
              onClick={() => {
                const visualize = (window as any).visualize
                if (typeof visualize === 'function') {
                  visualize()
                }
              }}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Visualize Data
            </button>
            
            <button 
              id="exportBtn" 
              onClick={() => {
                if (window.Plotly) {
                  window.Plotly.downloadImage(document.getElementById('chart'), {
                    format: 'svg',
                    filename: 'visualization'
                  })
                }
              }}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 101.414 1.414l-3 3a1 1 0 00-1.414 0l-3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Export SVG
            </button>
            
            <button 
              id="exportPDFBtn" 
              onClick={async () => {
                const chart = document.getElementById('chart')
                if (chart && window.html2canvas && window.jspdf) {
                  const canvas = await window.html2canvas(chart)
                  const imgData = canvas.toDataURL('image/png')
                  
                  const pdf = new window.jspdf.jsPDF()
                  const pdfWidth = pdf.internal.pageSize.getWidth()
                  const pdfHeight = (canvas.height * pdfWidth) / canvas.width
                  
                  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
                  pdf.save('visualization.pdf')
                }
              }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
              </svg>
              Export PDF
            </button>
          </div>

          {/* Chart container */}
          <div 
            id="chart" 
            className="w-full h-[600px] border border-border-primary rounded-lg shadow-md bg-background p-2"
          ></div>
        </div>
      </div>
    </div>
  )
}

// Add global type definitions for external libraries
declare global {
  interface Window {
    Plotly: any
    html2canvas: any
    jspdf: {
      jsPDF: any
    }
  }
}
