import { useParams } from 'react-router-dom'

function EventDetailsPage({ user, events }) {

    const { id } = useParams()

    return (
        <div>
            hello!
        </div>
    )
}
export default EventDetailsPage