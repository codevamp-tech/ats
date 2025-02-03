import Application from '../../models/Application.js'

const getApplicationByEmail = async ( req, res ) => {
    try {
        const email = req.params.email;
        console.log( 'Searching for hiring manager email:', email );

        const applications = await Application.aggregate( [
            {
                // First stage: get all applications
                $project: {
                    jobID: 1,
                    candidateID: 1,
                    applicationStatus: 1,
                    resume: 1,
                    contactInfo: 1,
                    experience: 1,
                    questions: 1,
                    answers: 1,
                    convertedJobId: { $toObjectId: "$jobID" },
                    convertedCandidateId: { $toObjectId: "$candidateID" }

                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'convertedJobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'convertedCandidateId',
                    foreignField: '_id',
                    as: 'candidateDetails'
                }
            },

            {
                $unwind: {
                    path: '$jobDetails',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $unwind: {
                    path: '$candidateDetails',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $match: {
                    'jobDetails.hiringManagerEmail': email
                }
            },
            {
                // Final stage: format the output
                $project: {
                    _id: 1,
                    jobID: 1,
                    candidateID: 1,
                    applicationStatus: 1,
                    resume: 1,
                    contactInfo: 1,
                    experience: 1,
                    questions: 1,
                    answers: 1,
                    jobDetails: 1,
                    candidateDetails: 1,
                }
            }
        ] );

        console.log( 'Found applications:', JSON.stringify( applications, null, 2 ) );

        if ( !applications || applications.length === 0 ) {
            return res.status( 404 ).json( {
                message: 'No applications found for this hiring manager',
                searchedEmail: email
            } );
        }

        res.status( 200 ).json( applications );
    } catch ( error ) {
        console.error( 'Error in pipeline:', error );
        res.status( 500 ).json( {
            message: 'Server error',
            error: error.message,
            searchedEmail: email
        } );
    }
};

export { getApplicationByEmail };