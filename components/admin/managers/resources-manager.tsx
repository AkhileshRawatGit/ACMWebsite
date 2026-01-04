"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, X } from "lucide-react"

interface Resource {
  id: number
  title: string
  category: string
  url: string
}

export default function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([
    { id: 1, title: "LeetCode", category: "Coding", url: "https://leetcode.com" },
    { id: 2, title: "MDN Web Docs", category: "Web Dev", url: "https://mdn.org" },
  ])

  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: number) => {
    setResources(resources.filter((r) => r.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Resources</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Add Resource
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Add Resource</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Resource Title" className="w-full px-4 py-2 border rounded-lg" />
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>Select Category</option>
                <option>Coding</option>
                <option>Web Dev</option>
                <option>Research</option>
                <option>Tools</option>
              </select>
              <input type="url" placeholder="URL" className="w-full px-4 py-2 border rounded-lg" />
              <textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border rounded-lg resize-none" />
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">URL</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{resource.title}</td>
                <td className="px-6 py-4">{resource.category}</td>
                <td className="px-6 py-4">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm truncate"
                  >
                    {resource.url}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-100 rounded transition-colors">
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(resource.id)}
                      className="p-2 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
