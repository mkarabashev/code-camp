const fs = require('fs');
const ogr2ogr = require('ogr2ogr');
const shapefile = ogr2ogr('assets/ne_10m_admin_0_map_subunits.shp')
  .format('ESRI Shapefile')
  .skipfailures()
  .stream()
shapefile.pipe(fs.createWriteStream('/shapefile.zip'))
