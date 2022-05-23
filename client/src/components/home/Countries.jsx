import React from 'react'

import Country from './Country'

import Paginator from './Paginator'

export default function Countries() {    
    return <Paginator RenderComponent={Country} />
}