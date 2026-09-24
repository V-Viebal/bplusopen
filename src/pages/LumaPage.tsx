import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Download, Bookmark, Check } from 'lucide-react';
import { LUMA_COLLECTION, LumaProduct } from '../data/lumaData';
import { Product, PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { formatDimensionsSummary } from '../utils/dimensionUtils';
import { useCatalogData } from '../context/CatalogDataContext';
import { InlineEditableText } from '../components/InlineEditableText';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { DeleteProductButton } from '../components/DeleteProductButton';

interface Props {
  productId?: string;
  savedProductIds: Set<string>;
  onToggleSave: (product: Product) => void;
  onNavigate: (page: PageId, extra?: { collection?: string; productId?: string }) => void;
}
const catalog = '/luma/catalog-luma-2026.pdf';
const groups = [['all', 'Tất cả', 'All'], ['deep-seating', 'Sofa & ghế bành', 'Lounge seating'], ['tables', 'Bàn trà & bàn phụ', 'Coffee & side tables'], ['dining', 'Bàn ghế ăn & bar', 'Dining & bar']];

export function LumaPage({ productId, savedProductIds, onToggleSave, onNavigate }: Props) {
  const { language } = useLanguage();
  const vi = language === 'vi';
  const { products, collections } = useCatalogData();
  const [category, setCategory] = useState('all');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  useEffect(() => { setActiveImage(null); }, [productId]);
  const product = products.find(p => p.id === productId && p.collection === 'luma') as LumaProduct | undefined;
  const col = (collections.find(c => c.id === 'luma') || LUMA_COLLECTION);
  const title = (p: Product) => vi ? p.nameVi || p.name : p.name;
  const openProduct = (p: Product) => { setActiveImage(null); onNavigate('product-detail', { productId: p.id }); };
  const download = <a href={catalog} download className="inline-flex items-center justify-center gap-2 border border-current px-5 py-3 text-sm font-semibold hover:opacity-70"><Download size={17}/>{vi ? 'Tải catalog LUMA 2026' : 'Download LUMA 2026 catalog'}</a>;
  const card = (p: LumaProduct) => <article key={p.id} className="relative bg-white border border-[#e3e1d9]">
    <DeleteProductButton product={p} className="absolute right-2 top-2" />
    <button onClick={() => openProduct(p)} className="block w-full overflow-hidden group" aria-label={title(p)}><InlineEditableImage record="product" recordId={p.id} field="imageUrl" value={p.imageUrl} alt={title(p)} className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105"/></button>
    <div className="p-5 border-t border-[#efeee7]">
      <p className="text-[10px] tracking-[.18em] uppercase text-[#65724d] mb-2">LUMA / 2026</p>
      <button onClick={() => openProduct(p)} className="text-left text-lg font-medium">{title(p)}</button>
      <p className="text-sm text-[#6d6d60] mt-2">{formatDimensionsSummary(p.dimensions)}</p>
      <div className="flex items-center justify-between mt-5"><button onClick={() => openProduct(p)} className="text-sm underline underline-offset-4">{vi ? 'Xem chi tiết' : 'View details'}</button><button className="p-2" aria-label={vi ? 'Lưu sản phẩm' : 'Save product'} onClick={() => onToggleSave(p)}>{savedProductIds.has(p.id) ? <Check size={18}/> : <Bookmark size={18}/>}</button></div>
    </div>
  </article>;
  return <div className="bg-[#f6f5ef] text-[#29331f]">
    {product ? <>
      <div className="max-w-7xl mx-auto px-5 py-7"><button onClick={() => onNavigate('collection-detail', { collection: 'luma' })} className="inline-flex items-center gap-2 text-sm"><ArrowLeft size={16}/> LUMA Collection</button></div>
      <section className="max-w-7xl mx-auto px-5 pb-16 grid lg:grid-cols-2 gap-8 lg:gap-14">
        <div>
          <InlineEditableImage record="product" recordId={product.id} field="imageUrl" value={activeImage || product.imageUrl} alt={title(product)} className="w-full aspect-square object-contain bg-white"/>
          <div className="grid grid-cols-3 gap-3 mt-3">{[product.imageUrl, product.lifestyleImageUrl, product.specImage].map((src,i) => <button key={src} onClick={() => setActiveImage(src)} aria-label={(vi ? 'Xem ảnh ' : 'View image ') + (i+1)} className={`border-2 ${activeImage === src ? 'border-[#41552b]' : 'border-transparent'}`}><img src={src} alt={i === 2 ? (vi ? 'Trang kỹ thuật' : 'Technical sheet') : title(product)} className="aspect-[4/3] w-full object-contain bg-white"/></button>)}</div>
        </div>
        <div className="lg:py-6">
          <p className="text-xs tracking-[.24em] uppercase mb-4">B+ Furniture / Outdoor Collection 2026</p>
          <h1 className="text-3xl sm:text-5xl font-light leading-tight"><InlineEditableText record="product" recordId={product.id} field={vi ? 'nameVi' : 'name'} value={title(product)} as="span" label={vi ? 'Tên sản phẩm tiếng Việt' : 'Product name'} /></h1>
          <p className="text-base leading-7 my-7 text-[#616650]"><InlineEditableText record="product" recordId={product.id} field={vi ? 'descriptionVi' : 'description'} value={vi ? product.descriptionVi || product.description : product.description} as="span" multiline label={vi ? 'Mô tả sản phẩm tiếng Việt' : 'Product description'} /></p>
          <dl className="divide-y divide-[#d9ddce] border-y border-[#d9ddce] text-sm">
            <div className="py-4 flex justify-between gap-5"><dt>{vi ? 'Rộng × sâu × cao' : 'Width × depth × height'}</dt><dd className="font-medium text-right">{formatDimensionsSummary(product.dimensions)}</dd></div>
            {product.dimensions.seatHeight && <div className="py-4 flex justify-between"><dt>{vi ? 'Chiều cao mặt ngồi' : 'Seat height'}</dt><dd>{product.dimensions.seatHeight} mm</dd></div>}
            <div className="py-4 flex justify-between gap-5"><dt>{vi ? 'Vật liệu' : 'Materials'}</dt><dd className="text-right">{vi ? product.materialVi : product.material}</dd></div>
            <div className="py-4 flex justify-between gap-5"><dt>{vi ? 'Hoàn thiện' : 'Finish'}</dt><dd>{vi ? 'Sơn tĩnh điện, tùy chỉnh màu' : 'Powder coating, custom colors'}</dd></div>
          </dl>
          {product.sourceNote && <p className="text-sm leading-6 mt-5 p-4 bg-[#ece9dc]">{vi ? product.sourceNoteVi : product.sourceNote}</p>}
          <p className="text-sm mt-6 mb-5">{vi ? 'Liên hệ để xác nhận giá, thời gian sản xuất và lựa chọn hoàn thiện.' : 'Contact us to confirm pricing, production lead time and finishes.'}</p>
          <div className="flex flex-wrap gap-3"><a href={`mailto:info@bplusfurniture.com.vn?subject=${encodeURIComponent('LUMA — '+product.name)}`} className="bg-[#3d5029] text-white px-6 py-3 text-sm">{vi ? 'Yêu cầu báo giá' : 'Request a quote'}</a><button onClick={() => onToggleSave(product)} className="border border-[#bac0ad] px-5 py-3 text-sm">{savedProductIds.has(product.id) ? (vi ? 'Đã lưu sản phẩm' : 'Saved to project') : (vi ? 'Lưu sản phẩm' : 'Save to project')}</button></div>
          <a href={`${catalog}#page=${product.sourcePage}`} target="_blank" rel="noreferrer" className="inline-flex mt-6 underline underline-offset-4 text-sm">{vi ? `Xem trang kỹ thuật ${product.sourcePage} trong catalog` : `View catalog technical page ${product.sourcePage}`}</a>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 pb-16"><h2 className="text-2xl font-light mb-6">{vi ? 'Trang kỹ thuật sản phẩm' : 'Product technical sheet'}</h2><a href={`${catalog}#page=${product.sourcePage}`} target="_blank" rel="noreferrer"><img src={product.specImage} alt={vi ? 'Thông số và bản vẽ sản phẩm từ catalog LUMA' : 'LUMA catalog dimensions and drawings'} className="w-full" loading="lazy"/></a></section>
    </> : <>
      <section className="relative min-h-[560px] h-[75vh] max-h-[850px] text-white flex items-end">
        <InlineEditableImage record="collection" recordId="luma" field="heroImage" value={col.heroImage} alt={vi ? 'Bộ bàn ghế LUMA trong sân vườn' : 'LUMA outdoor lounge collection in a garden'} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"/>
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 pb-12 sm:pb-16"><p className="text-xs tracking-[.3em] uppercase">B+ Furniture / Outdoor Collection 2026</p><h1 className="text-7xl sm:text-9xl font-light my-5 tracking-tight"><InlineEditableText record="collection" recordId="luma" field={vi ? 'nameVi' : 'name'} value={vi ? col.nameVi || col.name : col.name} as="span" label={vi ? 'Tên collection tiếng Việt' : 'Collection name'} /></h1><p className="max-w-lg text-lg mb-7"><InlineEditableText record="collection" recordId="luma" field={vi ? 'taglineVi' : 'tagline'} value={vi ? col.taglineVi || col.tagline : col.tagline} as="span" multiline label={vi ? 'Tagline collection tiếng Việt' : 'Collection tagline'} /></p><a href="#luma-products" onClick={e => { e.preventDefault(); document.getElementById('luma-products')?.scrollIntoView({behavior:'smooth'}); }} className="inline-flex items-center gap-5 border-b pb-2 text-sm">{vi ? 'Khám phá 18 thiết kế' : 'Explore 18 designs'}<ArrowRight size={18}/></a></div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10"><div><p className="uppercase text-xs tracking-[.2em] text-[#68754e] mb-5">LUMA / 2026</p><h2 className="text-3xl sm:text-4xl font-light leading-tight">{vi ? 'Nhẹ nhàng giữa thiên nhiên.' : 'At ease in the outdoors.'}</h2></div><div><p className="leading-8 text-[#646951] mb-7"><InlineEditableText record="collection" recordId="luma" field={vi ? 'descriptionVi' : 'description'} value={vi ? col.descriptionVi || col.description : col.description} as="span" multiline label={vi ? 'Mô tả collection tiếng Việt' : 'Collection description'} /></p>{download}</div></section>
      <section className="max-w-7xl mx-auto px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{(vi ? col.highlightSpecsVi! : col.highlightSpecs).map((s,i) => <div key={s} className="border-t border-[#cfd4c2] pt-5"><span className="text-xs text-[#8b9579]">0{i+1}</span><p className="mt-3 text-lg">{s}</p></div>)}</section>
    </>}
    <section id="luma-products" className="max-w-7xl mx-auto px-5 pb-20 scroll-mt-36">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-8"><h2 className="text-3xl font-light">{product ? (vi ? 'Cùng bộ sưu tập' : 'In the collection') : (vi ? '18 thiết kế LUMA' : '18 LUMA designs')}</h2>{!product && <div className="flex flex-wrap gap-2">{groups.map(([id,v,e]) => <button key={id} onClick={() => setCategory(id)} aria-pressed={category === id} className={`px-4 py-2 text-sm border ${category === id ? 'bg-[#3d5029] text-white border-[#3d5029]' : 'border-[#ced3c2]'}`}>{vi ? v : e}</button>)}</div>}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{products.filter(p => p.collection === 'luma').filter(p => product ? p.id !== product.id && p.category === product.category : category === 'all' || p.category === category).map(card)}</div>
    </section>
    {!product && <>
      <section className="grid md:grid-cols-2 gap-2">{[18,41].map(n => <img key={n} loading="lazy" src={`/luma/scene-${n}.webp`} alt={vi ? 'Không gian ngoài trời cùng LUMA' : 'Outdoor living with LUMA'} className="w-full aspect-[4/3] object-cover"/>)}</section>
      <section className="max-w-7xl mx-auto px-5 py-20"><p className="text-xs tracking-[.2em] mb-4">MATERIAL CODE</p><h2 className="text-3xl font-light mb-5">{vi ? 'Màu khung & chất liệu vải' : 'Frame colors & fabrics'}</h2><p className="text-[#646951] leading-7 max-w-2xl mb-8">{vi ? 'Bảng màu sơn tĩnh điện và mẫu vải Vietkai được trích từ catalog. Liên hệ để xác nhận mã màu, mẫu vải thực tế và khả năng cung ứng cho dự án.' : 'Powder coating and Vietkai fabric references from the catalog. Contact us to confirm color codes, physical samples and project availability.'}</p><img loading="lazy" src="/luma/materials-45.webp" alt={vi ? 'Bảng màu sơn tĩnh điện RAL' : 'RAL powder coating palette'} className="w-full mb-5"/><div className="grid md:grid-cols-2 gap-5">{[46,47,48,49,50,51].map(n => <a key={n} href={`${catalog}#page=${n}`} target="_blank" rel="noreferrer"><img loading="lazy" src={`/luma/materials-${n}.webp`} alt={`Vietkai — ${vi ? 'trang' : 'page'} ${n}`} className="w-full"/></a>)}</div></section>
    </>}
    <section className="bg-[#3d5029] text-white px-6 py-16 text-center"><h2 className="text-3xl font-light mb-6"><InlineEditableContent contentKey="luma.footer.title" value={vi ? 'LUMA cho không gian của bạn' : 'LUMA for your space'} as="span" /></h2><p className="mb-8 opacity-80">info@bplusfurniture.com.vn · +84 906 630 030</p>{download}</section>
  </div>;
}
