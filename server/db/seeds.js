use bucket_list;
db.dropDatabase();

db.list_items.insertMany([
{
  title: "Learn Spanish",
  category: "Education",
  description: "Learn Spanish, go on a course.",
  status: false
},
{
  title: "Climb a mountain",
  category: "Travel",
  description: "Climb Everest",
  status: false
},
{
  title: "Learn to surf",
  category: "Sport",
  description: "Do a surfing lesson at North Berwick",
  status: true
}]);
