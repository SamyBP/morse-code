import unittest

from setup_db import compute_create_table_query


class TestQueryGenerator(unittest.TestCase):
    
    def test_whenNoConstraints_returnsCorrectSqlString(self):
        given_definition = {
            'name': 'test',
            'columns': ['test_column text'],
            'constraints': None
        }
        
        query = compute_create_table_query(table=given_definition)
        expected_format = 'create table if not exists test (test_column text);'
        
        self.assertEqual(first=query, second=expected_format)
    
    def test_whenConstraints_returnsCorrectSqlString(self):
        given_definition = {
            'name': 'test',
            'columns': ['test_column_id int'],
            'constraints': ['foreign key (test_column_id) references reference(id)']
        }
        
        query = compute_create_table_query(table=given_definition)
        expected_format = 'create table if not exists test (test_column_id int,foreign key (test_column_id) references reference(id));'
        
        self.assertEqual(first=query, second=expected_format)
        