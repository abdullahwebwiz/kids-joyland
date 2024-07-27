import Link from 'next/link';
import productServices from '@/lib/services/productService';
import dynamic from 'next/dynamic';
const ProductItem = dynamic(() => import('@/components/products/ProductItem'));
const Rating = dynamic(() => import('@/components/products/Rating').then(mod => mod.Rating));

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all',brand='all', price = 'all', rating = 'all' },
}: {
  searchParams: {
    q: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    brand !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${brand !== 'all' ? ` : Brand ${brand}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    b,
    s,
    p,
    r,
    pg,
  }: {
    b?: string;
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category,brand, price, rating, sort, page };
    if (c) params.category = c;
    if (b) params.brand = b;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const brands = await productServices.getBrands();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    brand,
    q,
    price,
    rating,
    page,
    sort,
  });
  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div>
        <div className='py-2 text-xl'>Categories</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === category && 'link-primary'
                }`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link-hover link ${
                    c === category && 'link-primary'
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='py-2 text-xl'>Brands</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === brand && 'link-primary'
                }`}
                href={getFilterUrl({ b: 'all' })}
              >
                Any
              </Link>
            </li>
            {brands.map((b: string) => (
              <li key={b}>
                <Link
                  className={`link-hover link ${b === brand && 'link-primary'}`}
                  href={getFilterUrl({ b })}
                >
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className='py-2 text-xl'>Price</div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === price && 'link-primary'
                }`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link-hover link ${
                    p.value === price && 'link-primary'
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className='py-2 text-xl'>Customer Review</div>
          <ul className='flex flex-col gap-1'>
            <li>
              <Link
                href={getFilterUrl({ r: 'all' })}
                className={`link-hover link ${
                  'all' === rating && 'link-primary'
                }`}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link-hover link ${
                    `${r}` === rating && 'link-primary'
                  }`}
                >
                  <Rating caption={' & up'} value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='md:col-span-4'>
        <div className='flex flex-col justify-between py-4 md:flex-row'>
          <div className='flex items-center'>
            {products.length === 0 ? 'No' : countProducts} Results
            {q !== 'all' && q !== '' && ' : ' + q}
            {category !== 'all' && ' : ' + category}
            {brand !== 'all' && ' : ' + brand}
            {price !== 'all' && ' : Price ' + price}
            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            category !== 'all' ||
            brand !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Link className='btn btn-ghost btn-sm' href='/search'>
                Clear
              </Link>
            ) : null}
          </div>
          <div>
            Sort by:{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`link-hover link mx-2 ${
                  sort == s ? 'link-primary' : ''
                } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3  '>
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className='join'>
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`btn join-item ${
                    Number(page) === p + 1 ? 'btn-active' : ''
                  } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
