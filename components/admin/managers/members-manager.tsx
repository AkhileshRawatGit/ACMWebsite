"use client"

import { useState } from "react"
import { Plus, Trash2, X } from "lucide-react"

interface Member {
  id: number
  name: string
  email: string
  rollNumber: string
  branch: string
  joinedAt: string
}

export default function MembersManager() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "John Doe", email: "john@srhu.edu.in", rollNumber: "12345", branch: "CSE", joinedAt: "2024-01-15" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@srhu.edu.in",
      rollNumber: "12346",
      branch: "CSE",
      joinedAt: "2024-01-20",
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Members</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Add Member Manually</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Roll Number" className="w-full px-4 py-2 border rounded-lg" />
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>Select Branch</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>ME</option>
              </select>
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Roll Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Branch</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{member.name}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">{member.rollNumber}</td>
                <td className="px-6 py-4">{member.branch}</td>
                <td className="px-6 py-4">{member.joinedAt}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
