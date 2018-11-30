Purpose
=======
The purpose of this website is to show a history of crime in a local area for a defined period of time.

It uses two APIs

[Postcode finder](https://www.getthedata.com/postcode/). This lets you get a coordinate (long/lat) for a given postcode. Works throughout the UK

[UK Police Open Data API](https://data.police.uk/docs/). This covers all of the UK except Scotland (boo!) except for where BTP (British Transport Police) are involve which are UK wide.

Examples of API calls
=====================

**use postcode to find latitude and longitude**

-> postcode
<- data.longitude
<- data.latitude

http://api.getthedata.com/postcode/SW1A+1AA

-----
**get list of crime categories**

-> &date=yyyy-mm
<- [ {url, name} ]

https://data.police.uk/api/crime-categories?date=2011-08

-----
**get list of forces**

-> None
<- array of [{id, name}]

https://data.police.uk/api/forces

-----

**get neighbourhood + force from location**

-> &q=latitude,longitude
<- {force, neighbourhood}

https://data.police.uk/api/locate-neighbourhood?q=51.500617,-0.124629

-----

**get neighbourhood boundary**

- this is a list of points
- need to convert to GeoJSON if placing points on a map

-> /neighbourhood.id/boundary
<- [ {longitude,latitude} ]

https://data.police.uk/api/leicestershire/NC04/boundary

-----

**get crimes for a custom polygon**

- could try with bounding box first?
- could use : separated list of vertices from neighbourhood boundary in call above

-> /crime-category
-> &poly=[boundary]
-> &date=yyyy-mm
<- [ {incident} ]

https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2017-01

_____


Basic Wireframing

- system finds list of crime categories, populates pulldown


- user enters postcode
- user enters month
- user hits search


- location (lat/lon) established or error
- find neighbourhood and force from point, or error
- find boundary from neighbourhood
- finds incidents from boundary and month and crime type
- lists crimes in table
- user drills down into incident for more details
- stretch goal: points shown in leaflet

_____

Models and Views
================

**[View] IncidentTypeSelectView** [DONE]
- incidentType [pulldown #incident-type]
  - on select, publish to **IncidentTypeSelectView:change_category** [DONE]
  - subscribe to **PoliceApiModel:got-categories** [DONE]
    - when received, populate pulldown [DONE]

**[View] PostcodeSelectView** [DONE]
- postcode [text #postcode]
  - on submit, publish to **PostcodeSelectView:submit_postcode** [DONE]

**[Model] PostcodeAPIModel**
- converts a postcode to a location
- subscribe to **PostcodeSelectView:submit_postcode**
  - look up on API
  - publish result to **PostcodeAPIModel:got_postcode_location**

**[Model] PoliceApiModel**
- categories : list of viable types [DONE]
  - look up with API [DONE]
  - publish to **PoliceApiModel:have_categories** [DONE]
- neighbourhood
  - force
  - name
  - boundary
- timePeriod
  - year
  - month
- incidents
  - [ incident ]
- **findCategories**
  - publish to **PoliceApiModel:have_categories** [DONE]
- **findNeighbourHood(location)**
  - publish to **PoliceApiModel:have_neighbourhood**
- **findBoundary(neighbourhood)**
  - publish to **PoliceApiModel:have_boundary**
- **findIncidents(boundary, timeperiod, category)**
  - publish to **PoliceApiModel:have_incidents**
- subscribes to **PostcodeAPIModel:got_postcode_location**
  - call findNeighbourHood(location)
  - call findBoundary(neighbourhood)
  - call findIncidents(boundary, timePeriod, category)
- subscribes to **IncidentTypeSelectView:change_category**
  - call findNeighbourHood(location)
  - call findBoundary(neighbourhood)
  - call findIncidents(boundary, timePeriod, category)



**[View] NeighbourhoodView**
- Shows info on selected neighbourhood once this is known
  - forceName
  - neighbourhoodId
  - neighbourhoodName
  - boundary
- subscribes to **PoliceApiModel:have_neighbourhood**
  - re-renders
- subscribes to **PoliceApiModel:have_boundary**
  - re-renders

**[View] IncidentsView**
- Shows list of incidents. This is a container for a lot of individual incident cards.
- Subscribes to **PoliceApiModel:have_incidents**
  - creates container, and populates with a load of IncidentListView

**[View] IncidentListView**
- Shows incident in summary form.
- **render(incident)**
  - returns front-end element for incident in summary form

**[View] IncidentDetailView**
- Shows incident in detailed view.
