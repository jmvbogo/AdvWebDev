class Components {

    static employeeTable(data) {
        if (!Array.isArray(data))
            return Promise.resolve('')
        return Promise.resolve(`${data.map(row =>
                `<tr>
                    <td>${row.firstName}</td>
                    <td>${row.lastName}</td>
                    <td>${row.department}</td>
                    <td>${row.jobTitle}</td>
                    <td>${row.salary}</td>
                    <td>${row.startDate}</td>
                 </tr>`
        ).join('')}`)
    }

}
