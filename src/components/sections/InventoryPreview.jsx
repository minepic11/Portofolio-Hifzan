import { useId, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react'

const sampleItems = [
  { id: 'BRG-001', name: 'Buku catatan', category: 'Alat tulis', stock: 24, direction: 'Masuk' },
  { id: 'BRG-002', name: 'Kabel USB', category: 'Elektronik', stock: 12, direction: 'Masuk' },
  { id: 'BRG-003', name: 'Kotak kemasan', category: 'Kemasan', stock: 8, direction: 'Keluar' },
  { id: 'BRG-004', name: 'Pulpen hitam', category: 'Alat tulis', stock: 36, direction: 'Keluar' },
]
const filters = ['Semua barang', 'Barang masuk', 'Barang keluar']

export default function InventoryPreview() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(filters[0])
  const inputId = useId()
  const filteredItems = sampleItems.filter((item) => (
    `${item.name} ${item.id} ${item.category}`.toLowerCase().includes(query.toLowerCase().trim()) &&
    (filter === filters[0] || item.direction === (filter === filters[1] ? 'Masuk' : 'Keluar'))
  ))

  return (
    <figure className="project-preview">
      <figcaption className="preview-caption">
        <span>Conceptual Project Preview</span>
        <span>INTERACTIVE STUDY</span>
      </figcaption>
      <div className="inventory-shell">
        <div className="inventory-title">
          <span className="inventory-mark" aria-hidden="true">i.</span>
          <span>Inventori<span className="inventory-subtitle">Pencatatan barang</span></span>
          <span className="sample-label">Data contoh</span>
        </div>
        <div className="inventory-toolbar">
          <p className="inventory-list-heading">Daftar barang</p>
          <label className="inventory-search" htmlFor={inputId}>
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Cari barang dalam preview konseptual</span>
            <input
              id={inputId}
              type="search"
              placeholder="Cari barang..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="inventory-filters" role="group" aria-label="Filter data contoh">
          {filters.map((name) => (
            <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name}
            </button>
          ))}
        </div>
        <div className="inventory-table">
          <table>
            <caption className="sr-only">Inventori dengan data contoh, bukan data aplikasi asli</caption>
            <thead>
              <tr>
                <th scope="col">Nama barang</th>
                <th scope="col" className="category-cell">Kategori</th>
                <th scope="col">Stok</th>
                <th scope="col">Arus</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}<span className="item-code">{item.id}</span></td>
                  <td className="category-cell">{item.category}</td>
                  <td>{item.stock}</td>
                  <td>
                    <span className="inventory-direction">
                      {item.direction === 'Masuk'
                        ? <ArrowDownLeft size={13} aria-hidden="true" />
                        : <ArrowUpRight size={13} aria-hidden="true" />}
                      {item.direction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="inventory-empty">
              <p>Tidak ada barang contoh yang cocok.</p>
              <button type="button" onClick={() => { setQuery(''); setFilter(filters[0]) }}>
                Reset pencarian dan filter
              </button>
            </div>
          )}
        </div>
        <p className="inventory-result" role="status" aria-live="polite">
          Menampilkan {filteredItems.length} dari {sampleItems.length} barang contoh
        </p>
      </div>
      <p className="preview-note">Eksplorasi antarmuka dengan data contoh. Bukan tangkapan layar aplikasi asli.</p>
    </figure>
  )
}
