const token = Cypress.env('credentials')
const options = (method, urlPart = 'user/repos', body= null) => {
    return {
        method: method,
        url: Cypress.env('api_base') + urlPart,
        headers: { 'Authorization': `token ${token.TOKEN}` },
        body: body
    }
}


context('API Requests',  () => {

    it('Get list of repos', () => {
        cy.request(options('GET')).then(result => {
            console.log(result)
            expect(result.status).to.equal(200)
            expect(result.body).to.have.length(0)
        })
    })

    it('Create repo', () => {
        cy.fixture('repo/demo_repo.json').then( body => {
            cy.request(options('POST', 'user/repos', body)).then(result => {
                console.log(body)
                expect(result.status).to.equal(201)
                expect(result).property('body').to.contain({ name: 'blog', })
                expect(result).property('body').to.contain({ html_url: "https://github.com/my-demo-acc/blog", })
            })
        })

    })

    it('Delete repo', () => {
        cy.fixture('repo/demo_repo.json').then( body => {
            cy.request(options('DELETE', 'repos/my-demo-acc/blog')).then(result => {
                console.log(body)
                expect(result.status).to.equal(204)
                expect(result.body).to.have.length(0)
            })
        })

    })





})