<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
    </tr>
    </thead>
    <tbody>
    @foreach($transactions as $transaction)
        <tr>
            <td>{{ $transaction->reference_code }}</td>
            <td>{{ $transaction->grandtotal }}</td>
            <td>{{ $transaction->created_at }}</td>
        </tr>
    @endforeach
    </tbody>
</table>