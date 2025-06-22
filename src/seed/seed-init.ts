/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { prisma } from '../lib/prisma'
import { type Category, type Product, type ProductOption, type Promotion, Role, type User, type Branch } from '../lib/types'

const initialBranches: Branch[] = [
  {
    id: randomUUID(),
    name: 'Sucursal Centro',
    label: 'sucursal-centro',
    address: 'Av. Central #123',
    phone: '9903715312',
    phoneBot: '9903715312',
    phoneUser: '9811250049',
    hours: '9:00 AM - 10:00 PM',
    isOpen: true
  },
  {
    id: randomUUID(),
    name: 'Sucursal Norte',
    label: 'sucursal-norte',
    address: 'Calle 50 #456',
    phone: '9903715312',
    phoneBot: '9903715312',
    phoneUser: '9811250049',
    hours: '10:00 AM - 11:00 PM',
    isOpen: true
  }
]

// Category data
const initialCategories: Category[] = [
  { id: randomUUID(), name: 'Hamburguesas', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Hot Dogs', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Tortas', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Papas Fritas', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Snacks', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Bebidas', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Postres', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' },
  { id: randomUUID(), name: 'Promociones', image: 'https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp' }
]

// Stores the category IDs for use in product and promotion data
const categoryIds = initialCategories.reduce<Record<string, string>>((acc, category) => {
  acc[category.name] = category.id
  return acc
}, {})

// Product data
const initialProducts: Product[] = [
  // Hamburguesas
  {
    id: randomUUID(),
    name: 'Hamburguesa Sencilla',
    description: 'Carne de res, lechuga, tomate, cebolla y aderezo especial',
    price: 45,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbWJ1cmd1ZXNhfGVufDB8fDB8fHww',
    categoryId: categoryIds.Hamburguesas,
    isAvailable: true,
    createdAt: new Date()

  },
  {
    id: randomUUID(),
    name: 'Hamburguesa con Queso',
    description: 'Carne de res, queso americano, lechuga, tomate y cebolla',
    price: 55,
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhbWJ1cmd1ZXNhfGVufDB8fDB8fHww',
    categoryId: categoryIds.Hamburguesas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Hamburguesa Doble',
    description: 'Doble carne, doble queso, tocino, lechuga, tomate y cebolla',
    price: 75,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfYU8-fLn5NcMApKXlovqqVfQ57t73q_7-w&s',
    categoryId: categoryIds.Hamburguesas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Hamburguesa Hawaiana',
    description: 'Carne de res, queso, piña, jamón y salsa especial',
    price: 65,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhhbWJ1cmd1ZXNhfGVufDB8fDB8fHww',
    categoryId: categoryIds.Hamburguesas,
    isAvailable: true,
    createdAt: new Date()
  },

  // Hot Dogs
  {
    id: randomUUID(),
    name: 'Hot Dog Sencillo',
    description: 'Salchicha, pan, catsup, mostaza y mayonesa',
    price: 30,
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZG9nc3xlbnwwfHwwfHx8MA%3D%3D',
    categoryId: categoryIds['Hot Dogs'],
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Hot Dog Especial',
    description: 'Salchicha, tocino, queso derretido, jalapeños y cebolla',
    price: 45,
    image: 'https://images.unsplash.com/photo-1537790698196-aad88bf9bb27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZG9nc3xlbnwwfHwwfHx8MA%3D%3D',
    categoryId: categoryIds['Hot Dogs'],
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Hot Dog Jumbo',
    description: 'Salchicha jumbo, chili con carne, queso y cebolla crujiente',
    price: 50,
    image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGRvZ3N8ZW58MHx8MHx8fDA%3D',
    categoryId: categoryIds['Hot Dogs'],
    isAvailable: true,
    createdAt: new Date()
  },

  // Tortas
  {
    id: randomUUID(),
    name: 'Torta de Jamón',
    description: 'Jamón, queso, aguacate, jitomate, lechuga y mayonesa',
    price: 40,
    image: 'https://media.istockphoto.com/id/846063880/es/foto/jam%C3%B3n-suizo-y-sandwich-de-rucula.webp?a=1&b=1&s=612x612&w=0&k=20&c=LJ84P21Xt9kiJxHWHpP1FC9trUOf7Y_nXFkbnhJQLLo=',
    categoryId: categoryIds.Tortas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Torta de Milanesa',
    description: 'Milanesa de res, aguacate, jitomate, lechuga y mayonesa',
    price: 55,
    image: 'https://media.istockphoto.com/id/499674183/es/foto/s%C3%A1ndwich-de-pollo.jpg?s=612x612&w=0&k=20&c=7tSbXKmii8zp7bAx_Ff3G34HUTvSDKh4zWeyMhpziTM=',
    categoryId: categoryIds.Tortas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Torta Cubana',
    description: 'Jamón, queso, milanesa, salchicha, huevo, aguacate y frijoles',
    price: 70,
    image: 'https://media.istockphoto.com/id/1305689009/es/foto/cl%C3%A1sico-s%C3%A1ndwich-cubano-a-la-parrilla.jpg?s=612x612&w=0&k=20&c=9ddT6mvtjp0SAVLBC5rSPEI3HVdCfYcmxafbMQlL5D0=',
    categoryId: categoryIds.Tortas,
    isAvailable: true,
    createdAt: new Date()
  },

  // Papas Fritas
  {
    id: randomUUID(),
    name: 'Papas Fritas',
    description: 'Papas fritas crujientes con sal',
    price: 0,
    image: 'https://media.istockphoto.com/id/1495638137/es/foto/papas-fritas-en-olla-en-la-mesa-frente-a-la-pared-de-ladrillo.jpg?s=612x612&w=0&k=20&c=Rf8kpBTAv2ZRVS2q5CoYzBhVcCfBlJHuEYupv2RDCgI=',
    categoryId: categoryIds['Papas Fritas'],
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Papas Fritas con Salsa',
    description: 'Porción grande de papas fritas crujientes con salsa de trufa',
    price: 0,
    image: 'https://media.istockphoto.com/id/1867541332/es/foto/primer-plano-de-patatas-fritas-con-queso-y-salsa-de-trufa-negra.jpg?s=612x612&w=0&k=20&c=1_00ITpbtGDjxzPOOlV_IiL0sm5We57bc8CV58598Fc=',
    categoryId: categoryIds['Papas Fritas'],
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Papas con Queso',
    description: 'Papas fritas cubiertas con queso cheddar derretido',
    price: 45,
    image: 'https://media.istockphoto.com/id/2027765034/es/foto/deliciosas-papas-fritas-cargadas-con-queso-y-crema-agria.jpg?s=612x612&w=0&k=20&c=_w_xeBsl9jIbDolPuwqqkDKMvJSsbNIIC7AjqV9tJZk=',
    categoryId: categoryIds['Papas Fritas'],
    isAvailable: true,
    createdAt: new Date()
  },

  // Snacks
  {
    id: randomUUID(),
    name: 'Nachos con Queso',
    description: 'Totopos con queso derretido, jalapeños y pico de gallo',
    price: 50,
    image: 'https://media.istockphoto.com/id/509993206/es/foto/nachos.jpg?s=612x612&w=0&k=20&c=UlzQoQ88ZI9l8a9Hx1-4XD5ineCqweRzm1Gkdq0x0T4=',
    categoryId: categoryIds.Snacks,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Alitas BBQ (6 pzas)',
    description: 'Alitas de pollo bañadas en salsa BBQ',
    price: 85,
    image: 'https://media.istockphoto.com/id/2163052205/es/foto/homemade-garlic-parmesan-chicken-wings-in-a-plate.jpg?s=612x612&w=0&k=20&c=_fFF-8LYuP1Qm5h7fDDwfUPeIsciV3Nip8i59UCOOMM=',
    categoryId: categoryIds.Snacks,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Nuggets de Pollo',
    description: '8 piezas de nuggets de pollo con aderezo a elegir',
    price: 60,
    image: 'https://media.istockphoto.com/id/618209540/es/foto/cesta-de-nuggets-de-pollo-con-salsa-agridulce.jpg?s=612x612&w=0&k=20&c=BewWO31I_5HKBlh8w0cFfn3j-TzYhLNjeBDi5IxB1gY=',
    categoryId: categoryIds.Snacks,
    isAvailable: true,
    createdAt: new Date()
  },

  // Bebidas
  {
    id: randomUUID(),
    name: 'Coca-Cola',
    description: 'Refresco de cola 500ml',
    price: 20,
    image: 'https://media.istockphoto.com/id/1887055343/es/foto/renderizado-3d-de-bebida-y-agua.jpg?s=612x612&w=0&k=20&c=Nu2sqmG1P_-LAREETtW5N8KJQVKcRD0KZ3UY5fC-aVs=',
    categoryId: categoryIds.Bebidas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Agua Mineral',
    description: 'Agua mineral 500ml',
    price: 0,
    image: 'https://media.istockphoto.com/id/1060742942/es/foto/se-vierte-en-un-vaso-de-agua.jpg?s=612x612&w=0&k=20&c=xagi1288_G_S8KY5zFkvWOCISJdnH0tNg2zQ1EICQtQ=',
    categoryId: categoryIds.Bebidas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Limonada',
    description: 'Limonada natural con hielo 500ml',
    price: 25,
    image: 'https://media.istockphoto.com/id/537228258/es/foto/frasco-para-conservas-gafas-de-limonada-caseras-en-madera-r%C3%BAstica.jpg?s=612x612&w=0&k=20&c=W3BHW8jizneBee3Gye4crswQwwKdrGegAgu5_Vj5M2U=',
    categoryId: categoryIds.Bebidas,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Cerveza',
    description: 'Cerveza nacional 355ml',
    price: 35,
    image: 'https://media.istockphoto.com/id/495306979/es/foto/hilera-de-copas-de-cervezas-diferentes-en-el-bar-de-madera.jpg?s=612x612&w=0&k=20&c=1ewK3z1QtBDGtRhO9lsmrgztJq2OoZGL3KpkZYBge40=',
    categoryId: categoryIds.Bebidas,
    isAvailable: true,
    createdAt: new Date()
  },

  // Postres
  {
    id: randomUUID(),
    name: 'Pastel de Chocolate',
    description: 'Rebanada de pastel de chocolate con ganache',
    price: 40,
    image: 'https://media.istockphoto.com/id/2165404401/es/foto/tarta-de-chocolate-con-glaseado-de-chocolate-en-un-plato-negro-junto-a-un-tenedor.jpg?s=612x612&w=0&k=20&c=fMB6H6Rh7_ZqLc9aSb-m9hjMm-ec_YFzXsl9UNtHu1Y=',
    categoryId: categoryIds.Postres,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Helado de Vainilla',
    description: 'Dos bolas de helado de vainilla con topping a elegir',
    price: 35,
    image: 'https://media.istockphoto.com/id/1326143969/es/foto/bol-con-bolas-de-helado-de-vainilla.jpg?s=612x612&w=0&k=20&c=1U2ePAMN2Zodvnl5917YtsnUIs3a0z_u1FHazJthkIc=',
    categoryId: categoryIds.Postres,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Flan Napolitano',
    description: 'Porción de flan casero con caramelo',
    price: 30,
    image: 'https://media.istockphoto.com/id/146773364/es/foto/flan.jpg?s=612x612&w=0&k=20&c=jCf-FRhYysARrDFTLSSOA647mu017izKG3WLzf59btA=',
    categoryId: categoryIds.Postres,
    isAvailable: true,
    createdAt: new Date()
  }
]

// ProductOption data
const initialProductOptions: ProductOption[] = [
  // Hamburger (ingredients)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Hamburguesa con Queso')!.id,
    name: 'Queso extra',
    price: 25,
    quantity: 0,
    isAvailable: true,
    type: 'ingredient'
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Hamburguesa con Queso')!.id,
    name: 'Cebolla',
    price: 0,
    quantity: 0,
    isAvailable: true,
    type: 'ingredient'
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Hamburguesa con Queso')!.id,
    name: 'Tomate',
    price: 0,
    quantity: 0,
    isAvailable: true,
    type: 'ingredient'
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Hamburguesa con Queso')!.id,
    name: 'Lechuga',
    price: 0,
    quantity: 0,
    isAvailable: true,
    type: 'ingredient'
  },

  // Fries (sizes)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Papas Fritas')!.id,
    name: 'Chicas',
    price: 25,
    quantity: 0,
    isAvailable: true,
    type: 'size'
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Papas Fritas')!.id,
    name: 'Medianas',
    price: 45,
    quantity: 0,
    isAvailable: true,
    type: 'size'
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Papas Fritas')!.id,
    name: 'Grandes',
    price: 65,
    quantity: 0,
    isAvailable: true,
    type: 'size'
  },

  // Fries (variables)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === 'Papas Fritas con Salsa')!.id,
    name: 'Salsa de trufa',
    price: 0,
    quantity: 0,
    isAvailable: true,
    type: 'variable'
  }
]

// Promotion data
const initialPromotions: Promotion[] = [
  {
    id: randomUUID(),
    name: 'Combo Hamburguesa + Papas + Refresco',
    description: 'Hamburguesa sencilla con papas fritas chicas y refresco',
    discountPercentage: 15,
    originalPrice: 90,
    promoPrice: 75,
    image: 'https://media.istockphoto.com/id/533712416/es/foto/hamburguesa-con-queso-con-bebida-de-cola-y-patatas-fritas-de-luz-rojo.jpg?s=612x612&w=0&k=20&c=7wm2IEMh5KPKkyTPrl-LbdJZ3ufgC1GCJAhP0zinPVw=',
    isActive: true,
    categoryId: categoryIds.Promociones,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: '2 Hot Dogs por $50',
    description: 'Lleva 2 hot dogs sencillos por solo $50',
    discountPercentage: 10,
    originalPrice: 60,
    promoPrice: 50,
    image: 'https://media.istockphoto.com/id/1349560418/es/foto/dos-perritos-calientes-con-ketchup-y-mostaza.jpg?s=612x612&w=0&k=20&c=1jgMNA6Kr6X2q6qmCRfURsnhaGYQlMSZ7g9T43ZCWAs=',
    isActive: true,
    categoryId: categoryIds.Promociones,
    createdAt: new Date()
  },
  {
    id: randomUUID(),
    name: 'Refresco gratis en pedidos mayores a $100',
    description: 'Obtén un refresco gratis en compras mayores a $100',
    discountPercentage: 15,
    originalPrice: 20,
    promoPrice: 0,
    image: 'https://media.istockphoto.com/id/2162110995/es/foto/soft-drinks.jpg?s=612x612&w=0&k=20&c=HdRyjTS-8Yw0RGAe540GeUbg0XysD6lEIhuSMZlhemY=',
    isActive: true,
    categoryId: categoryIds.Promociones,
    createdAt: new Date()
  }
]

// User data
const initialUsers: User[] = [
  {
    id: randomUUID(),
    name: 'David',
    email: 'david@mail.com',
    phoneNumber: '+5219811250049',
    role: Role.ADMIN,
    password: bcrypt.hashSync('userseed', 10), // Hashed password
    createdAt: new Date()
  }
]

// Main function to run the seed
const seed = async () => {
  console.log('⏳ Limpiando base de datos...')
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.productOption.deleteMany(),
    prisma.product.deleteMany(),
    prisma.promotion.deleteMany(),
    prisma.category.deleteMany(),
    prisma.branch.deleteMany(),
    prisma.user.deleteMany()
  ])

  console.log('⏳ Insertando categorías...')
  await prisma.category.createMany({ data: initialCategories })

  console.log('⏳ Insertando sucursales...')
  await prisma.branch.createMany({ data: initialBranches })

  console.log('⏳ Insertando productos...')
  await prisma.product.createMany({ data: initialProducts })

  console.log('⏳ Insertando opciones de productos...')
  await prisma.productOption.createMany({ data: initialProductOptions })

  console.log('⏳ Insertando promociones...')
  await prisma.promotion.createMany({ data: initialPromotions })

  console.log('⏳ Insertando usuarios...')
  await prisma.user.createMany({ data: initialUsers })

  console.log('⏳ Relacionando productos con sucursales...')

  const branches = await prisma.branch.findMany()
  const centro = branches.find(b => b.name === 'Sucursal Centro')!
  const norte = branches.find(b => b.name === 'Sucursal Norte')!
  const products = await prisma.product.findMany()

  const centroOnlyNames = ['Hamburguesa con Queso', 'Torta Cubana', 'Papas Fritas con Salsa']
  const norteOnlyNames = ['Hot Dog Jumbo', 'Alitas BBQ (6 pzas)', 'Flan Napolitano']

  const centroIds = products.filter(p => centroOnlyNames.includes(p.name)).map(p => p.id)
  const norteIds = products.filter(p => norteOnlyNames.includes(p.name)).map(p => p.id)
  const ambas = products.filter(p => !centroOnlyNames.includes(p.name) && !norteOnlyNames.includes(p.name))

  await Promise.all([
    ...centroIds.map(async id => await prisma.product.update({ where: { id }, data: { branches: { connect: [{ id: centro.id }] } } })),
    ...norteIds.map(async id => await prisma.product.update({ where: { id }, data: { branches: { connect: [{ id: norte.id }] } } })),
    ...ambas.map(async p => await prisma.product.update({ where: { id: p.id }, data: { branches: { connect: [{ id: centro.id }, { id: norte.id }] } } }))
  ])

  console.log('✅ Seed completado')
};

(() => {
  if (process.env.NODE_ENV === 'production') return
  seed()
})()
